# tips_share

## Prerequisites

Install [Docker Desktop](https://docs.docker.com/get-docker) for Mac, Windows, or Linux. Docker Desktop includes Docker Compose as part of the installation.

## Development

First, run the development server:

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create tips_share_network

# Build dev
docker compose -f compose.dev.yaml build

# Up dev
docker compose -f compose.dev.yaml up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### OWASP ZAP scan

To run a security scan without starting it every time you launch the frontend,
use the `zap` service defined in the compose file:

```bash
# Start the frontend in one terminal
docker compose -f compose.dev.yaml up

# In another terminal run the scan
docker compose --profile zap up zap
```

Reports are written to the `zap-reports/` directory.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Production

Multistage builds are highly recommended in production. Combined with the Next [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) feature, only `node_modules` files required for production are copied into the final Docker image.

First, run the production server (Final image approximately 110 MB).

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create tips_share_network

# Build prod
docker compose -f compose.prod.yaml build

# Up prod in detached mode
docker compose -f compose.prod.yaml up -d
```

Alternatively, run the production server without multistage builds (Final image approximately 1 GB).

```bash
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create tips_share_network

# Build prod without multistage
docker compose -f compose.prod-without-multistage.yaml build

# Up prod without multistage in detached mode
docker compose -f compose.prod-without-multistage.yaml up -d
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

# Free space
docker system prune -af --volumes
```

## Supabase (Local development)

This project uses Supabase CLI for local backend (Postgres, Auth, Storage, Studio) development.

First, install Supabase CLI via npm:

```bash
# Or install in this project (already listed in package.json)
npm install
```

## [Running Supabase locally](https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=npm&queryGroups=access-method&access-method=studio#running-supabase-locally)

Then initialize and start Supabase services (Postgres, Auth, Storage, Studio).

```bash
# Initialize supabase project (only the first time)
npx supabase init

# Start local supabase containers
npx supabase start
```

Update your .env.local (inside your frontend project) with the local Supabase API URL and anon key printed by supabase start, for example:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## Link

- [capacitor DOCS](https://capacitorjs.jp/docs/vscode/getting-started)
