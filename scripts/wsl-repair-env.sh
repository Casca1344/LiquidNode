#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "==> CWD: $(pwd)"

if [ -s "${HOME}/.nvm/nvm.sh" ]; then
  # shellcheck source=/dev/null
  source "${HOME}/.nvm/nvm.sh"
  if nvm ls 20 >/dev/null 2>&1; then
    nvm use 20
  elif nvm ls 22 >/dev/null 2>&1; then
    nvm use 22
  else
    echo "==> Installing Node 20 via nvm (Vite 8 / Tailwind 4 require Node 20+)"
    nvm install 20
    nvm use 20
  fi
fi

echo "==> Node: $(node -v) | npm: $(npm -v) | platform: $(node -p 'process.platform + " " + process.arch')"
NODE_MAJOR="$(node -p 'parseInt(process.versions.node, 10)')"
if [ "${NODE_MAJOR}" -lt 20 ]; then
  echo "ERROR: Node 20+ required for Vite 8 / @tailwindcss/vite. Install nvm and: nvm install 20 && nvm use 20"
  exit 1
fi

echo "==> Stopping dev-related Node processes (best effort)"
pkill -f "[v]ite" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true

echo "==> Removing node_modules and package-lock.json"
rm -rf node_modules package-lock.json

echo "==> npm cache clean --force"
npm cache clean --force

echo "==> npm install --prefer-offline --no-audit"
npm install --prefer-offline --no-audit

echo "==> Native bindings (Linux x64 / glibc) — workaround npm optional-deps bug"
npm install @rolldown/binding-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu

echo "==> Smoke: npm run dev (~15s)"
timeout 15s npm run dev || true

echo "==> Repair script finished (exit 124 from timeout = dev server was running)"
