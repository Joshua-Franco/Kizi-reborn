# 🎮 Web for Games — Kizi 2019 Replica

A modern, high-performance replica of the iconic **Kizi (2019)** platform layout, rebuilt from scratch with a cutting-edge web stack.

---

## ⚠️ Legal Disclaimer

- **Non-Commercial:** This project is strictly non-commercial. It contains no ads, tracking, monetization, or donations of any kind.
- **Open Source Scope:** The **MIT License** applies **strictly to the source code** written by the author.

---

## 📢 Note to Copyright Owners & Users

- **To Copyright Owners:** This repository contains **only** open-source code (React components, TypeScript logic, and Tailwind styles) written entirely by the author. **No copyrighted images, logos, assets, or game files (.swf / HTML5) are hosted here.** If you still wish for this repository to be removed, please open a GitHub Issue and it will be deleted immediately.
- **To Users:** This is a code-only template. To see the full interface with graphics and games, you must provide your own assets inside the `public/` directory.

---

## ✨ Features & Tech Stack

| Layer | Technology |
|---|---|
| **Core UI & State** | [React 19](https://react.dev/) + [TypeScript 6](https://www.typescriptlang.org/) |
| **Routing** | `@tanstack/react-router` — type-safe navigation |
| **Data Fetching** | `@tanstack/react-query` — performant caching & state management |
| **Performance** | `@tanstack/react-virtual` — grid virtualization |
| **Tables** | `@tanstack/react-table` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) via the new `@tailwindcss/vite` compiler plugin |
| **Flash Emulation** | [Ruffle](https://ruffle.rs/) (`@ruffle-rs/ruffle`) — runs SWF files via WebAssembly once assets are provided |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/web-for-games.git
cd web-for-games

# Install dependencies
pnpm install

# Add your own assets
# Place recovered Kizi 2019 images and .swf files into the public/ folder

# Start the development server
pnpm dev
```

---

## 🕹️ Game Emulation

This project is prepared for a hybrid gaming environment:

- **HTML5 Games** — run via standard iframes.
- **Flash Games (.swf)** — integrated with Ruffle through WebAssembly.

### ⚠️ Known Issue: Ruffle Configuration

Ruffle requires specific asset-serving configurations to load the `.wasm` player correctly in Vite. Contributions to optimize the Vite + Ruffle bundler setup are welcome — feel free to open a Pull Request.

---

## 📁 Project Structure

```
web-for-games/
├── public/                  # Static assets (favicon, icons)
├── src/
│   ├── assets/
│   │   ├── games/           # Game thumbnail images (.jpg)
│   │   └── ui/              # UI sprites (logo, icons, flags, category buttons)
│   ├── components/
│   │   ├── Layout/          # App shell (header + sidebar + outlet)
│   │   ├── Header/          # Top bar (logo, user info, search, language)
│   │   ├── Sidebar/         # Left category navigation (60px)
│   │   ├── GameGrid/        # Responsive CSS Grid of game cards
│   │   ├── GameCard/        # Individual game thumbnail with hover overlay
│   │   ├── FeaturedGames/   # Featured game row
│   │   ├── GamePlayer/      # HTML5 iframe / Ruffle Flash embed
│   │   └── PlayFullscreenIcons.tsx  # Fullscreen toggle SVG icons
│   ├── config/
│   │   ├── play-page-game.ts        # Default play page game config
│   │   ├── game-display-sizes.ts    # Viewport dimensions per game
│   │   ├── play-page-layout.ts      # Play page layout constants
│   │   └── thumb-to-game-map.ts     # Maps thumb slugs to installed games
│   ├── context/
│   │   └── GameContext.tsx   # Global state (user, search, category, selection)
│   ├── games/
│   │   ├── games_html5/      # HTML5 game files (Fireboy & Watergirl 7)
│   │   ├── games_flashplayer/ # 42 .swf Flash game files
│   │   └── games_unity/      # Unity WebGL game files
│   ├── hooks/
│   │   ├── useGames.ts       # TanStack Query hooks for game data
│   │   └── useKiziLayout.ts  # Responsive grid layout calculations
│   ├── pages/
│   │   ├── HomePage/         # Main game grid homepage
│   │   └── Play/             # Game detail/play page (route: /games/$slug)
│   ├── plugins/
│   │   ├── serveGamesPlugin.ts    # Vite plugin: serves game files via /game-files/
│   │   └── ruffleAssetsPlugin.ts  # Vite plugin: serves Ruffle .wasm assets
│   ├── routes/
│   │   └── index.tsx         # TanStack Router setup (home + game detail routes)
│   ├── services/
│   │   └── gameService.ts    # Mock data service (simulates API fetch)
│   ├── styles/
│   │   └── global.css        # Base styles, Oswald font, Kizi color palette
│   ├── types/
│   │   └── game.ts           # TypeScript interfaces (Game, Category, etc.)
│   ├── utils/
│   │   ├── assetCatalog.ts         # Vite glob-based asset resolver
│   │   ├── constants.ts            # Category definitions, languages
│   │   ├── fullscreen.ts           # Browser fullscreen API helpers
│   │   ├── gameCatalog.ts          # Scans games/ for HTML5 & Flash files
│   │   ├── gameFullscreenSize.ts   # Fullscreen scaling math
│   │   ├── gamePlayConfig.ts       # Resolves full play config from slug
│   │   ├── gameRegistry.ts         # Maps thumbs to installed games
│   │   ├── kiziAssets.ts           # Kizi UI asset URL map
│   │   ├── playUiAssets.ts         # Play page UI asset URL map
│   │   └── ruffleLoader.ts         # Lazy-loads Ruffle script
│   ├── App.tsx              # Root component (providers)
│   ├── main.tsx             # Application entry point
│   └── index.css            # Tailwind import
├── index.html               # Vite HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript project references
├── tsconfig.app.json        # TypeScript config (app)
├── tsconfig.node.json       # TypeScript config (Node)
├── eslint.config.js         # ESLint flat config
└── package.json             # Dependencies & scripts
```
