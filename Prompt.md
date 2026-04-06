You are a senior full-stack engineer building KeywordIQ — a scalable, 
no-login SEO keyword research tool suite.

Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, 
FastAPI (Python), Supabase (PostgreSQL + cache).

MCP Servers in use:
- Supabase MCP: manage DB schema, run migrations, inspect cached results,
  create/update tables
- GitHub MCP: create branches, commit code, open PRs, manage issues
- Stitch MCP (Google): generate and export UI designs for screens before
  coding them

External data sources (all free, no paid APIs):
- pytrends: Google Trends data (no API key required)
- Google Autocomplete: keyword suggestions via suggestqueries.google.com
  (no API key required)
- yt-dlp: YouTube video metadata and tags via scraping (no API key required)
- Groq API: LLM-powered meta tag and SEO suggestion generation using
  Llama 3 (free tier, key required)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGES & NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No authentication. No login. No account icons. The navbar contains
only navigation links to tools and informational pages.

Public pages (nav links):
  / ................. Landing page
  /keyword-analysis . Keyword Analysis tool (→ /results → export modal)
  /youtube-finder ... YouTube Keyword Finder tool
  /instagram-finder . Instagram Keyword & Hashtag Finder tool
  /hashtag-gen ...... Hashtag Generator tool (multi-platform)
  /meta-tag-gen ..... SEO Meta Tag Generator tool (AI-powered, standalone)
  /about ............ About Us
  /contact .......... Contact Us

Navbar contains: logo + the 5 tool links + About + Contact.
No user avatar, no login button, no account menu — tools only.

Landing page sections:
  - Hero with tagline and a single search bar (routes to /keyword-analysis)
  - 5 feature cards (one per tool) with icon, title, and one-line description
  - "How it works" section (3 steps: Search → Analyze → Export)
  - Footer with links to About and Contact

Keyword Analysis flow:
  /keyword-analysis → search input → /results?q=KEYWORD → export modal
  Results page panels (each in its own feature component):
    • Interest over time graph (pytrends)
    • Autocomplete suggestions list (Google Autocomplete)
    • YouTube tags panel (yt-dlp)
    • AI meta tags panel (Groq / Llama 3)
    • Search history sidebar (localStorage)
  Export modal formats: JSON, CSV, TXT (one handler file each)

YouTube Keyword Finder (/youtube-finder):
  - Standalone search for YouTube-specific keyword research
  - Returns: related video titles, view counts, tags, channel names
  - Panels: top videos list, tag cloud, suggested keywords
  - Export: JSON, CSV

Instagram Keyword Finder (/instagram-finder):
  - Hashtag search + trending hashtags panel
  - Niche suggestions based on entered keyword
  - Panels: hashtag results, trending now, niche clusters
  - Data sourced via Google Autocomplete + Groq suggestions

Hashtag Generator (/hashtag-gen):
  - Input: topic or keyword
  - Output: platform-specific hashtag bundles
    (Instagram 30-tag set, Twitter/X 5-tag set, LinkedIn 10-tag set)
  - Powered by Groq / Llama 3 (same service as groq_llm.py)
  - Export: TXT, copy-to-clipboard

SEO Meta Tag Generator (/meta-tag-gen):
  - Input: page URL or text description
  - Output: <title>, <meta description>, Open Graph tags, Twitter card tags
  - Powered by Groq / Llama 3
  - One-click copy per field

About Us (/about): static page — team description, tool mission
Contact Us (/contact): static page — contact form (name, email, message)
  stored to Supabase contacts table, no auth required

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARCHITECTURE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend: feature-based folder structure under /features — each feature
owns its components, hooks, and types.

Backend: domain-based modules under /api — each domain owns its router,
service, schema, and tests.

Shared logic (types, utils, constants) lives in /shared on both frontend
and backend.

All API calls go through a central /lib/api-client.ts with error handling.

Environment variables stored in .env.local (frontend) and .env (backend),
never hardcoded.

Cache layer: every keyword lookup checks Supabase first (60-min TTL)
before calling external APIs.

All 4 external data source calls (pytrends, Autocomplete, yt-dlp, Groq)
must run in parallel via asyncio.gather().

yt-dlp and pytrends calls must be wrapped in asyncio.to_thread() since
both are synchronous.

Each feature module must be independently testable and importable.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODING STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TypeScript strict mode, no any types.
Python type hints on all functions.
Zod validation on all API responses in frontend.
Pydantic schemas on all FastAPI endpoints.
Error boundaries per feature section, not a single global one.
Loading skeletons per section, not full-page spinners.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCALABILITY REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

New data sources (Bing, Semrush, Ahrefs) can be added as new service
modules in /api/keyword/services/ without touching existing code.

New UI panels can be added as new feature folders without modifying the
results page layout.

New tools (e.g., a TikTok keyword finder) can be added as a new page
under /app/[tool-name]/ and a new feature folder without touching
existing tools.

Export formats (JSON, CSV, TXT) each live in their own handler in
/features/export/handlers/.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENVIRONMENT VARIABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backend .env:  GROQ_API_KEY, SUPABASE_URL, SUPABASE_KEY
Frontend .env.local: NEXT_PUBLIC_API_URL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT ROOT & UNIFIED DEV RUNNER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The entire project lives under a single root folder: KeywordIQ/
Both frontend and backend are subfolders of that root.
A developer must be able to clone the repo, run ONE command from
KeywordIQ/, and have both servers start correctly.

Root-level files required (all at KeywordIQ/, not inside a subfolder):

  package.json          — root package with a "dev" script that starts
                          both frontend and backend in parallel using
                          the "concurrently" package:
                          {
                            "name": "keywordiq",
                            "scripts": {
                              "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
                              "dev:frontend": "cd frontend && npm run dev",
                              "dev:backend": "cd backend && uvicorn main:app --reload --port 8000",
                              "install:all": "npm install && cd frontend && npm install",
                              "setup": "npm run install:all && cd backend && pip install -r requirements.txt"
                            },
                            "devDependencies": {
                              "concurrently": "^8.2.2"
                            }
                          }

  .env.example          — root-level template listing every required
                          variable for both frontend and backend:
                          # Backend
                          GROQ_API_KEY=
                          SUPABASE_URL=
                          SUPABASE_KEY=
                          # Frontend
                          NEXT_PUBLIC_API_URL=http://localhost:8000

  README.md             — must include a "Quick Start" section:
                          1. git clone → cd KeywordIQ
                          2. Copy .env.example to backend/.env and fill values
                          3. Copy .env.example to frontend/.env.local and fill NEXT_PUBLIC_API_URL
                          4. npm run setup   ← installs all JS and Python deps
                          5. npm run dev     ← starts both servers
                          Frontend: http://localhost:3000
                          Backend:  http://localhost:8000
                          API docs: http://localhost:8000/docs

  requirements.txt      — at KeywordIQ/backend/requirements.txt listing
                          every Python dependency with pinned versions:
                          fastapi, uvicorn[standard], supabase, pydantic-settings,
                          httpx, pytrends, yt-dlp, groq, python-dotenv

  docker-compose.yml    — optional but required to be present for
                          container-based dev:
                          services:
                            frontend:
                              build: ./frontend
                              ports: ["3000:3000"]
                              env_file: ./frontend/.env.local
                              depends_on: [backend]
                            backend:
                              build: ./backend
                              ports: ["8000:8000"]
                              env_file: ./backend/.env

Ports convention (never change these):
  Frontend  → localhost:3000
  Backend   → localhost:8000
  Supabase  → cloud (no local port)

NEXT_PUBLIC_API_URL in frontend/.env.local must always be
http://localhost:8000 for local dev — never hardcoded in source files.

backend/main.py must include a health-check route:
  GET /health → { "status": "ok", "version": "1.0.0" }
  This is used by docker-compose depends_on and by the README
  smoke test to confirm the backend is running before testing tools.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOLDER STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KeywordIQ/                            ← git root, run all commands here
├── package.json                      # "npm run dev" starts everything
├── .env.example                      # template for both .env files
├── README.md                         # quick start in 5 steps
├── docker-compose.yml                # optional container runner
├── frontend/                         # Next.js 14
│   ├── .env.local                    # gitignored — copy from .env.example
│   ├── package.json
│   ├── app/
│   │   ├── page.tsx                  # Landing page
│   │   ├── keyword-analysis/
│   │   │   └── page.tsx
│   │   ├── results/
│   │   │   └── page.tsx
│   │   ├── youtube-finder/
│   │   │   └── page.tsx
│   │   ├── instagram-finder/
│   │   │   └── page.tsx
│   │   ├── hashtag-gen/
│   │   │   └── page.tsx
│   │   ├── meta-tag-gen/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── error.tsx
│   ├── features/
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── useSearch.ts
│   │   │   └── search.types.ts
│   │   ├── trending/
│   │   │   ├── TrendingPanel.tsx
│   │   │   ├── KeywordChip.tsx
│   │   │   └── useTrending.ts
│   │   ├── autocomplete/
│   │   │   ├── AutocompleteList.tsx
│   │   │   └── useAutocomplete.ts
│   │   ├── youtube-tags/
│   │   │   ├── YouTubeTagsPanel.tsx
│   │   │   ├── TagChip.tsx
│   │   │   └── useYouTubeTags.ts
│   │   ├── youtube-finder/
│   │   │   ├── VideoResultsList.tsx
│   │   │   ├── TagCloud.tsx
│   │   │   └── useYouTubeFinder.ts
│   │   ├── instagram-finder/
│   │   │   ├── HashtagResults.tsx
│   │   │   ├── TrendingHashtags.tsx
│   │   │   ├── NicheSuggestions.tsx
│   │   │   └── useInstagramFinder.ts
│   │   ├── hashtag-gen/
│   │   │   ├── HashtagGenForm.tsx
│   │   │   ├── PlatformBundle.tsx
│   │   │   └── useHashtagGen.ts
│   │   ├── meta-tag-gen/
│   │   │   ├── MetaGenForm.tsx
│   │   │   ├── MetaOutputCard.tsx
│   │   │   └── useMetaGen.ts
│   │   ├── meta-tags/
│   │   │   ├── MetaTagsPanel.tsx
│   │   │   ├── MetaCard.tsx
│   │   │   └── useMetaTags.ts
│   │   ├── interest-graph/
│   │   │   ├── InterestGraph.tsx
│   │   │   └── useInterestData.ts
│   │   ├── export/
│   │   │   ├── ExportModal.tsx
│   │   │   └── handlers/
│   │   │       ├── exportJson.ts
│   │   │       ├── exportCsv.ts
│   │   │       └── exportTxt.ts
│   │   ├── search-history/
│   │   │   ├── SearchHistory.tsx
│   │   │   └── useSearchHistory.ts
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeatureCards.tsx
│   │   │   └── HowItWorks.tsx
│   │   └── contact/
│   │       ├── ContactForm.tsx
│   │       └── useContact.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ui/
│   ├── lib/
│   │   ├── api-client.ts
│   │   └── validators/
│   └── shared/
│       ├── types/
│       ├── utils/
│       └── constants.ts
│
└── backend/                          # FastAPI
    ├── .env                          # gitignored — copy from .env.example
    ├── requirements.txt              # pinned Python deps
    ├── main.py                       # includes GET /health
    ├── api/
    │   ├── keyword/
    │   │   ├── router.py
    │   │   ├── service.py
    │   │   ├── schemas.py
    │   │   └── services/
    │   │       ├── pytrends.py
    │   │       ├── autocomplete.py
    │   │       ├── youtube.py
    │   │       └── groq_llm.py
    │   ├── youtube/
    │   │   ├── router.py
    │   │   ├── service.py
    │   │   └── schemas.py
    │   ├── instagram/
    │   │   ├── router.py
    │   │   ├── service.py
    │   │   └── schemas.py
    │   ├── hashtag/
    │   │   ├── router.py
    │   │   ├── service.py
    │   │   └── schemas.py
    │   ├── metatag/
    │   │   ├── router.py
    │   │   ├── service.py
    │   │   └── schemas.py
    │   ├── contact/
    │   │   ├── router.py
    │   │   └── schemas.py
    │   └── cache/
    │       ├── cache_service.py
    │       └── cache_router.py
    ├── core/
    │   ├── config.py
    │   ├── database.py
    │   ├── middleware.py
    │   └── exceptions.py
    └── tests/
        ├── test_keyword_service.py
        ├── test_youtube_service.py
        ├── test_instagram_service.py
        ├── test_hashtag_service.py
        └── test_cache_service.py
        
.gitignore rules (root KeywordIQ/.gitignore must cover):
  frontend/.env.local
  backend/.env
  node_modules/
  frontend/.next/
  backend/__pycache__/
  backend/.venv/
  *.pyc
  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICE IMPLEMENTATION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

pytrends.py:    use pytrends.request.TrendReq, wrap in asyncio.to_thread()
autocomplete.py: use httpx.AsyncClient → suggestqueries.google.com/complete/search?q=KEYWORD&client=firefox
youtube.py:     use yt-dlp with ytsearch5:KEYWORD, wrap in asyncio.to_thread()
groq_llm.py:    use groq SDK with model llama3-8b-8192; accepts a mode
                param ("meta_tags" | "hashtags" | "meta_page") so a single
                service file handles all three Groq-powered tools
service.py:     orchestrate all 4 with asyncio.gather(pytrends_task,
                autocomplete_task, youtube_task, groq_task)
cache_service.py: normalize keyword (lowercase + strip) → check Supabase
                  → hit within 60 min returns cached → miss calls
                  asyncio.gather → stores result → returns
contact/router.py: POST /api/contact → insert row into Supabase
                   contacts table (name, email, message, created_at)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXTENSIBILITY NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/api/keyword/services/ is a plug-in folder — adding Bing or Semrush later
means dropping a new file there and registering it in service.py; nothing
else changes.

/features/ on the frontend means each panel is fully self-contained — add
a "TikTok Keyword Finder" by creating /app/tiktok-finder/page.tsx and a
new /features/tiktok-finder/ folder without touching any existing page.

ExportModal handlers are split per format — adding PDF export is one new
file in /features/export/handlers/exportPdf.ts.

The cache check lives entirely in cache_service.py — switching from
Supabase to Redis means changing only that file.

groq_llm.py serves all three AI-powered tools (meta tags in results,
hashtag generator, meta tag generator standalone) through a single service
with a mode parameter — no duplication.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CODE REVIEW — TOKEN-EFFICIENT WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After completing every task, use the files at the path below for code review.
Read only what is needed — do not load files irrelevant to the task —
to use tokens properly.

D:\Dhaval Prajapati\Test
D:\Dhaval Prajapati\Test>tree
├───.claude
│   └───skills
├───.code-review-graph
└───.cursor

Workflow: Complete task → identify which of the above files are relevant
to what was just built → read only those → run code review → report
findings before moving to the next task.

