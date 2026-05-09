# Abid's Pomodoro

A modern, minimalist productivity timer with motivational quotes — built with **React**, **Vite**, and **Tailwind CSS**. Designed to help students, developers, and remote workers maintain focus through structured work/break intervals.


## Features

- **Focus Timer** — 25-minute Pomodoro sessions (customisable)
- **Break Modes** — Short break (5 min) and long break (15 min)
- **Countdown Display** — Clean MM:SS with animated SVG progress ring
- **Start / Pause / Reset** — One-click controls with keyboard shortcuts
- **Session Switching** — Seamless toggling between focus and break modes
- **Persistent Settings** — Durations saved to `localStorage`
- **Motivational Quotes** — "Motivate Me" button that displays random inspiring quotes
- **Dark Theme** — Minimal, glassmorphic UI with subtle accent colours
- **Fully Responsive** — Looks great on desktop, tablet, and mobile
- **Accessible** — ARIA labels, keyboard navigation, and semantic markup
- **Smooth Animations** — CSS transitions, pulse glow, and slide-up effects

## Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Framework  | [React 18](https://react.dev)                             |
| Build tool | [Vite](https://vitejs.dev)                                |
| Styling    | [Tailwind CSS 3](https://tailwindcss.com)                 |
| Language   | JavaScript (JSX)                                          |
| Fonts      | Inter (UI) + JetBrains Mono (timer digits)                |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone <your-repo-url>
cd abiuds-pomodoro

npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output goes to the `dist/` folder — ready for deployment.

## Deployment

### Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project**.
3. Import the GitHub repo.
4. Vercel will auto-detect Vite. Keep the defaults:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

The app will be live in under a minute.

### Other Platforms

Any static host works — Netlify, Cloudflare Pages, GitHub Pages, etc. Just point the platform to the `dist/` folder after running `npm run build`.

## Project Structure

```
abiuds-pomodoro/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── TimerDisplay.jsx       # Countdown + SVG progress ring
│   │   ├── TimerControls.jsx      # Start / Pause / Reset buttons
│   │   ├── SessionSelector.jsx    # Focus / Short Break / Long Break pills
│   │   ├── Settings.jsx           # Duration sliders panel
│   │   └── MotivationalQuote.jsx  # Random quote picker with "Motivate Me" button
│   ├── data/
│   │   └── quotes.js              # Collection of motivational quotes
│   ├── hooks/
│   │   ├── useTimer.js            # Core countdown logic
│   │   └── useLocalStorage.js     # localStorage persistence
│   ├── constants.js               # Mode definitions and defaults
│   ├── App.jsx                    # Root layout + keyboard shortcuts
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Tailwind directives + custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Keyboard Shortcuts

| Key     | Action          |
| ------- | --------------- |
| `Space` | Start / Pause   |
| `R`     | Reset timer     |

## Customisation

Edit `src/constants.js` to change default durations. User-customised durations are also available via the Settings gear icon and persist across sessions.


## License

MIT — feel free to use, modify, and share.
