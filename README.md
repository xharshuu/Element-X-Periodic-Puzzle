# Element-X: Periodic Puzzle

Element-X is a browser game for learning the periodic table. Drag each element tile from the palette to its correct position on the table, earn points for correct placements, and progress through six levels.

## Features

- Six levels that introduce more elements as you progress
- Drag-and-drop element placement
- Score and countdown timer
- Pause and shuffle controls
- Color-coded element categories and sound effects

## Requirements

- Node.js
- npm

## Run locally

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5000](http://localhost:5000). If port 5000 is already in use, set a different port before starting the server.

PowerShell:

```powershell
$env:PORT = "5173"
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Play

1. Select **Start** and dismiss the level introduction.
2. Drag an element from the palette to its matching position on the periodic table.
3. Use **Pause** to stop the timer or **Shuffle** to rearrange the remaining palette tiles.
4. Place the required elements to advance through the levels.

## Production build

Build the client and server bundles:

```sh
npm run build
```

On macOS or Linux, start the production server with:

```sh
npm start
```

On Windows PowerShell, set the production environment and start the built server:

```powershell
$env:NODE_ENV = "production"
node dist/index.js
```

## Project structure

- `client/src/App.tsx` — game screen, level progression, timer, and score
- `client/src/components/PeriodicTable.tsx` — table layout and placement logic
- `client/src/data/periodicTableData.ts` — periodic table element data
- `client/public/` — game sounds, textures, fonts, and other static assets
- `server/` — Express development and production server
