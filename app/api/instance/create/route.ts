import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { instanceName } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  if (!instanceName) {
    return NextResponse.json({ error: 'Instance name is required' }, { status: 400 });
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const evolutionApiUrl = process.env.EVOLUTION_API_URL;
    const evolutionApiKey = process.env.EVOLUTION_API_KEY;

    if (!evolutionApiUrl || !evolutionApiKey) {
      throw new Error('Server configuration error: API URL or Key is missing.');
    }

    const createInstanceResponse = await axios.post(
      `${evolutionApiUrl}/instance/create`,
      {
        instanceName: instanceName,
        qrcode: true,
      },
      { headers: { 'apikey': evolutionApiKey } }
    );

    const createdInstance = createInstanceResponse.data.instance;

    const { data: newInstance, error: dbError } = await supabase
      .from('instances')
      .insert({
        instance_name: createdInstance.instanceName,
        user_id: userId,
        owner_number: createdInstance.owner,
        instance_status: 'PENDING',
      })
      .select()
      .single();

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json({ error: 'An instance with this name already exists.' }, { status: 409 });
      }
      throw new Error(`Database Error: ${dbError.message}`);
    }

    const pairingCodeResponse = await axios.get(
      `${evolutionApiUrl}/instance/pairing-code`,
      {
        params: { instance: createdInstance.instanceName },
        headers: { 'apikey': evolutionApiKey },
      }
    );

    const pairingCode = pairingCodeResponse.data.code;

    return NextResponse.json({
      message: 'Instance created successfully',
      instance: newInstance,
      pairingCode: pairingCode
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating instance:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || 'Failed to create instance';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
