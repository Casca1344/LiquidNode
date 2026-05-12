# Liquid Node

A premium **demo front end** for a Solana liquid staking experience: dashboard, protocol overview, and a simulated **mint tSOL (Taller SOL)** flow for presentations and video demos. **No wallet connection and no on-chain transactions** — all state is local to the browser.

## Features

- Dark, institutional-style UI (React 19, Tailwind CSS v4, Lucide icons).
- Dashboard with simulated APY, TVL, and tSOL price cards.
- Animated mint flow with progress (client-side simulation only).
- Protocol view placeholder for narrative around validators, slashing coverage, and node curation.

## Requirements

- **Node.js** `^20.19.0` or `>=22.12.0` (required by Vite 8 and `@tailwindcss/vite`).
- npm (ships with Node).

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run dev`  | Start Vite dev server with HMR       |
| `npm run build`| Typecheck and production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint                           |

## Getting started

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Serve the contents of `dist/` from any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

## Linux / WSL native bindings

This repo lists optional Linux x64 native packages for Rolldown and Tailwind Oxide. If `npm install` fails on Linux or WSL, see `scripts/wsl-repair-env.sh` for a repair sequence (nvm, clean install, optional native packages).

## Security notice

Do **not** commit `.env` files, API keys, or deployment tokens. The `.gitignore` is configured to exclude them. If you add environment variables later, commit only a sanitized `.env.example` with dummy values.

## Disclaimer

This repository is a **UI mockup** for storytelling and demos. It is not financial advice and does not implement a real staking program.

## Tech stack

- [Vite](https://vitejs.dev/) 8
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 6
- [Tailwind CSS](https://tailwindcss.com/) 4 (`@tailwindcss/vite`)
- [ESLint](https://eslint.org/) 10 (flat config)
