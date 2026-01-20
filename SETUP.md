# SchedWhats - Setup Instructions

This document contains step-by-step instructions for setting up the SchedWhats project locally and connecting to GitHub.

## Prerequisites

- Node.js 18+ installed
- - npm or yarn package manager
  - - Git installed and configured
    - - GitHub account with SSH keys configured (optional, but recommended)
     
      - ## Step 1: Clone the Repository
     
      - ```bash
        git clone https://github.com/andreaandretta/schedwhats-app.git
        cd schedwhats-app
        ```

        Or using SSH (if SSH keys are configured):

        ```bash
        git clone git@github.com:andreaandretta/schedwhats-app.git
        cd schedwhats-app
        ```

        ## Step 2: Install Dependencies

        ```bash
        npm install
        # or
        yarn install
        ```

        ## Step 3: Setup Environment Variables

        Copy the example environment file:

        ```bash
        cp .env.example .env.local
        ```

        Then edit `.env.local` and fill in the required values:

        ```
        NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
        SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
        N8N_WEBHOOK_URL=your_n8n_webhook_url
        EVOLUTION_API_URL=your_evolution_api_url
        EVOLUTION_API_KEY=your_evolution_api_key
        ```

        ## Step 4: Run Development Server

        ```bash
        npm run dev
        # or
        yarn dev
        ```

        Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

        ## Step 5: Connect to Remote Repository

        If you're developing locally and want to sync with GitHub:

        ```bash
        # Check current remotes
        git remote -v

        # Add remote if not already added (only needed if cloning from scratch)
        git remote add origin https://github.com/andreaandretta/schedwhats-app.git

        # Set upstream to main branch
        git branch -M main
        git push -u origin main
        ```

        ## Step 6: Daily Development Workflow

        ```bash
        # Before starting work
        git pull origin main

        # Make your changes, then:
        git add .
        git commit -m "feat: description of your changes"

        # Push to GitHub
        git push origin main
        ```

        ## Database Setup (Supabase)

        The database schema has already been created in Supabase:
        - Table: `instances` - WhatsApp connection sessions
        - - Table: `messages` - Scheduled messages queue
          - - RLS policies are enabled for data isolation per user
           
            - See `docs/database.md` for full schema documentation.
           
            - ## Common Issues
           
            - ### Port 3000 already in use
           
            - ```bash
              # Use a different port
              npm run dev -- -p 3001
              ```

              ### Module not found errors

              ```bash
              # Clear node_modules and reinstall
              rm -rf node_modules package-lock.json
              npm install
              ```

              ### Environment variables not loading

              - Ensure `.env.local` file exists in the root directory
              - - Restart the dev server after changing environment variables
                - - Check that all required variables are set (no empty values)
                 
                  - ## Testing
                 
                  - ```bash
                    # Run tests
                    npm run test

                    # Run tests with coverage
                    npm run test:coverage
                    ```

                    ## Building for Production

                    ```bash
                    npm run build
                    npm start
                    ```

                    ## Deployment to Coolify

                    See `docs/deployment.md` for instructions on deploying with Coolify and Docker.

                    ## Need Help?

                    - Check the README.md for project overview
                    - - Review documentation in the `/docs` folder
                      - - Open an issue on GitHub
                       
                        - ---

                        **Happy coding! 🚀**
