import { NextResponse } from 'next/server';

export async function GET() {
  try {
      // In futuro potremmo aggiungere qui controlli su DB o altre dipendenze
          return NextResponse.json(
                { status: 'OK', timestamp: new Date().toISOString() },
                      { status: 200 }
                          );
                            } catch (error) {
                                return NextResponse.json(
                                      { status: 'ERROR', error: (error as Error).message },
                                            { status: 503 } // Service Unavailable
                                                );
                                                  }
                                                  }