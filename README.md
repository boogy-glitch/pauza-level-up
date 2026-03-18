# Pauza Level Up

Aplicație web educațională pentru pauze școlare incluzive și interactive, dedicată elevilor din ciclul primar.

## Rulare rapidă (un singur click)

### Pe Windows (tablă inteligentă / laptop)
1. Instalează [Node.js](https://nodejs.org/) (doar prima dată)
2. Dublu-click pe **`start.bat`**
3. Se deschide automat în browser pe `http://localhost:3000`

### Pe Mac / Linux
1. Instalează [Node.js](https://nodejs.org/) (doar prima dată)
2. Dublu-click pe **`start.sh`** (sau rulează `./start.sh` din terminal)

### Instalare ca aplicație (PWA) — recomandat pentru table inteligente
1. Deschide aplicația în **Google Chrome** (`http://localhost:3000`)
2. Click pe iconița **Install** din bara de adresă (sau meniul ⋮ → "Install Pauza Level Up")
3. Aplicația apare pe desktop/ecranul de start ca o aplicație normală
4. Funcționează **100% offline** după instalare

## Dezvoltare

```bash
npm install     # Instalare dependințe
npm run dev     # Server de dezvoltare (port 3000)
npm run build   # Build pentru producție
npm run preview # Preview build-ul
```

## Tech Stack

- React 19 + Vite 6
- Tailwind CSS 4
- Framer Motion
- TypeScript
- PWA (Progressive Web App) pentru suport offline
