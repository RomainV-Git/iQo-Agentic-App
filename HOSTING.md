# Hosting guide

This is a standard Next.js application. It can be deployed on any platform that supports Node.js or Docker.

## Build

```bash
npm run build   # outputs to .next/
```

## Platform options

| Platform           | Recommended approach          |
|--------------------|-------------------------------|
| Netlify            | Next.js plugin (SSR support)  |
| Cloudflare Pages   | Next.js on Pages (Edge)       |
| AWS (ECS / EC2)    | Docker image (infra/)         |
| GCP / Azure        | Docker image (infra/)         |
| VPS / bare metal   | Docker + nginx reverse proxy  |
| Railway / Fly.io   | Docker image (infra/)         |

## Docker

```bash
docker build -f infra/Dockerfile -t iqo-agentic-app .
docker run -p 3000:3000 --env-file .env.local iqo-agentic-app
```

## GitHub Actions secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret               | Description                    |
|----------------------|--------------------------------|
| `HOSTING_TOKEN`      | Auth token for your platform   |
| `HOSTING_SITE_ID`    | Site / project identifier      |
| `HOSTING_ACCOUNT_ID` | Account identifier (if needed) |
| `ANTHROPIC_API_KEY`  | Injected at build/runtime      |
| `MAKE_WEBHOOK_URL`   | Make webhook endpoint          |
