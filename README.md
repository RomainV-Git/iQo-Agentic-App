# iQo Agentic App

Plateforme de pilotage des agents IA — cabinet iQo.  
Interface mobile et desktop, responsive automatique.

## Stack

| Couche    | Technologie                          |
|-----------|--------------------------------------|
| Framework | Next.js 14 (App Router)              |
| UI        | React 18                             |
| API       | Next.js Route Handlers (`app/api/`)  |
| Agents    | Make webhooks + Anthropic API        |
| CI/CD     | GitHub Actions                       |
| Deploy    | Agnostique — voir `HOSTING.md`       |

## Démarrage

```bash
npm install
cp .env.example .env.local   # remplir les variables
npm run dev                   # → http://localhost:3000
```

## Structure

```
iqo-agentic-app/
├── app/
│   ├── api/
│   │   ├── agents/route.js   # Trigger agents via Make
│   │   ├── fil/route.js      # Décisions (valider / rejeter)
│   │   └── chat/route.js     # Proxy Anthropic (clé côté serveur)
│   ├── components/
│   │   └── IqoApp.jsx        # App client complète ('use client')
│   ├── globals.css
│   ├── layout.jsx            # Root layout + metadata
│   └── page.jsx              # Entry point
├── src/
│   ├── data/                 # agents · projects · sources · fil
│   ├── hooks/                # useAgents · useFil · useResponsive
│   └── lib/                  # constants · api.js
├── public/                   # favicon, icons, manifest
├── infra/
│   └── Dockerfile            # Build multi-stage Next.js standalone
├── .github/workflows/        # CI/CD GitHub Actions
├── .env.example
├── HOSTING.md
└── next.config.mjs
```

## Variables d'environnement

| Variable              | Description                              | Exposition  |
|-----------------------|------------------------------------------|-------------|
| `ANTHROPIC_API_KEY`   | Clé Anthropic — jamais dans le bundle    | Serveur     |
| `ANTHROPIC_MODEL`     | Modèle (défaut : `claude-sonnet-4-5`)    | Serveur     |
| `MAKE_WEBHOOK_URL`    | Webhook Make pour triggers et décisions  | Serveur     |
| `NEXT_PUBLIC_APP_ENV` | `development` / `staging` / `production` | Client + Serveur |

> Les variables sans préfixe `NEXT_PUBLIC_` ne sont **jamais** exposées au navigateur.

## Commandes

```bash
npm run dev        # Dev (hot reload)
npm run build      # Build production
npm run start      # Serveur production local
npm run lint       # ESLint
npm run format     # Prettier

# Docker
docker build -f infra/Dockerfile -t iqo-agentic-app .
docker run -p 3000:3000 iqo-agentic-app
```

## Règle deux-cloud iQo

- **Anthropic US** — agents internes, veille, livrables non-sensibles
- **Azure EU / Dimple** — données client confidentielles

La route `app/api/chat/route.js` est le seul point d'entrée vers Anthropic.
