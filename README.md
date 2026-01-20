# SchedWhats

**Micro-SaaS for WhatsApp Message Scheduling** 📱⏰

Schedule and send bulk WhatsApp messages with ease. Price: **€1.99/month**

## 🎯 Features

- ✅ Schedule WhatsApp messages in advance
- - ✅ Send bulk messages to multiple recipients
  - - ✅ Real-time message tracking and analytics
    - - ✅ User-friendly dashboard
      - - ✅ REST API for integrations
       
        - ## 🏗️ Tech Stack
       
        - - **Frontend**: Next.js 14 (React, TypeScript)
          - - **Backend**: Supabase (PostgreSQL, RLS)
            - - **Automation**: n8n (Docker on Coolify)
              - - **WhatsApp Integration**: Evolution API v2 (Pairing Code)
                - - **Deployment**: DigitalOcean + Coolify
                 
                  - ## 📋 Project Structure
                 
                  - ```
                    schedwhats-app/
                    ├── pages/                 # Next.js pages
                    ├── components/            # React components
                    ├── lib/                   # Utilities and helpers
                    ├── styles/               # Global styles
                    └── public/               # Static assets
                    ```

                    ## 🚀 Getting Started

                    ### Prerequisites

                    - Node.js 18+
                    - - npm or yarn
                      - - GitHub account
                        - - Supabase account
                         
                          - ### Local Development
                         
                          - ```bash
                            # Clone repository
                            git clone https://github.com/andreaandretta/schedwhats-app.git
                            cd schedwhats-app

                            # Install dependencies
                            npm install

                            # Setup environment variables
                            cp .env.example .env.local

                            # Run development server
                            npm run dev
                            ```

                            Open [http://localhost:3000](http://localhost:3000) in your browser.

                            ## 📝 Environment Variables

                            Create `.env.local` file with:

                            ```
                            NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
                            NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
                            SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
                            N8N_WEBHOOK_URL=your_n8n_webhook_url
                            EVOLUTION_API_URL=your_evolution_api_url
                            EVOLUTION_API_KEY=your_evolution_api_key
                            ```

                            ## 🔐 Security

                            - Row-Level Security (RLS) enabled on all tables
                            - - User authentication via Supabase Auth
                              - - API rate limiting and input validation
                                - - HTTPS only in production
                                 
                                  - ## 📊 Database Schema
                                 
                                  - - **instances**: WhatsApp connection sessions
                                    - - **messages**: Scheduled messages queue
                                     
                                      - See [Supabase dashboard](https://app.supabase.com) for full schema details.
                                     
                                      - ## 🤝 Contributing
                                     
                                      - Contributions are welcome! Please read our contributing guidelines.
                                     
                                      - ## 📄 License
                                     
                                      - MIT License - See LICENSE file for details
                                     
                                      - ## 👨‍💻 Author
                                     
                                      - Andrea Andretta - [@andreaandretta](https://github.com/andreaandretta)
                                     
                                      - ---

                                      **Built with ❤️ for WhatsApp automation**
