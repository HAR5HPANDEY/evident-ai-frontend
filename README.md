# EVIDENT AI — Frontend

The web interface for EVIDENT AI, an AI-powered fact-checking agent.

**Live site:** https://evident-nu.vercel.app
**Backend repo:** https://github.com/<your-username>/evident-ai-backend

---

## Features

- Paste any message, or upload a screenshot for OCR-based extraction
- Color-coded verdict cards (True / False / Misleading / Unverifiable) with cited sources
- Built-in FAQ / help widget
- Fully responsive, dark premium UI

## Tech Stack

React, Vite, Tailwind CSS

## Running Locally

```bash
git clone https://github.com/<your-username>/evident-ai-frontend.git
cd evident-ai-frontend
npm install
npm run dev
```

Visit `http://localhost:5173`.

The app calls the live backend at `https://evident-ai-backend.onrender.com` by default — update `API_BASE` in `src/App.jsx` to point elsewhere if needed.
