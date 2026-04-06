You are a senior engineer auditing KeywordIQ before it goes live.
KeywordIQ is a no-login SEO research tool built on:
  Frontend : Next.js 14 (App Router), TypeScript, Tailwind, shadcn/ui
  Backend  : FastAPI (Python), Supabase (PostgreSQL + cache)
  External : pytrends, Google Autocomplete (httpx), yt-dlp, Groq/Llama3

Read every file in the codebase using the code-review graph at:
  D:\Dhaval Prajapati\Test\.code-review-graph

Read ONLY files relevant to each finding — do not load unrelated files —
to use tokens properly.

Produce a prioritised report using exactly the four tiers below.
For every finding give: file path + line number · plain-English description
· minimal fix. Be ruthless. Assume most code was AI-generated and has
never been manually verified for security or correctness.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. CRITICAL — must fix before deploy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Secrets & credentials
- Is GROQ_API_KEY, SUPABASE_URL, or SUPABASE_KEY present in any
  committed file (including git history, docker-compose, CI configs)?
- Does .gitignore correctly exclude .env and backend/.env?
- Is NEXT_PUBLIC_API_URL ever hardcoded anywhere in the frontend?

Input validation — server side
- backend/api/keyword/router.py: does GET /api/analyze validate `q`
  for max length, allowed characters, and empty/null?
- backend/api/contact/router.py: does POST /api/contact enforce field
  length limits via Pydantic before the Supabase insert?
- backend/api/hashtag/router.py and backend/api/metatag/router.py:
  is user-supplied text sanitised before being injected into the Groq
  prompt string? Check for prompt injection vectors.
- backend/api/youtube/router.py and services/youtube.py: is the
  keyword sanitised before being passed to yt-dlp? A shell-escape
  or argument injection here is a remote code execution risk.

SQL injection & XSS
- Are all Supabase queries using parameterised calls (supabase-py
  client methods), never raw string interpolation?
- Are any API responses rendered as raw HTML in the frontend
  (dangerouslySetInnerHTML or equivalent)?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. HIGH — fix before real users touch it
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Environment variables
- Does .env.example exist and list every variable used in the codebase:
  GROQ_API_KEY, SUPABASE_URL, SUPABASE_KEY, NEXT_PUBLIC_API_URL?
- Does frontend/lib/api-client.ts fall back to a localhost URL when
  NEXT_PUBLIC_API_URL is unset, or does it fail loudly?

Hard-coded dev values
- Search all files for "localhost", "127.0.0.1", "supabase.co/project/",
  "http://" (non-TLS URLs). Flag every occurrence with file + line.

Error handling & stack traces
- Does backend/core/exceptions.py return a generic error message in
  production, or does FastAPI's default handler leak the full Python
  traceback to the HTTP response?
- Do frontend error boundaries (per feature, not global) catch errors
  without exposing raw error objects in the UI?

Database
- Does the Supabase cache table have a composite index on
  (normalised_keyword, created_at)? Without it every cache check
  is a full table scan.
- Does the contacts table have an index on created_at if it will be
  queried for admin views?
- Are all migrations applied and matching the current schema? Check
  for any migration files that were created but never run.
- Are there N+1 patterns anywhere asyncio.gather() results are further
  fetched row-by-row from Supabase?

Timeouts
- backend/api/keyword/service.py: does asyncio.gather() have per-task
  timeouts via asyncio.wait_for()? pytrends and yt-dlp can hang
  indefinitely, blocking the entire response.
- backend/api/keyword/services/pytrends.py and youtube.py: are the
  asyncio.to_thread() calls wrapped with a timeout?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. MEDIUM — fix in first week
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CORS
- backend/core/middleware.py: is allow_origins set to ["*"]?
  It must be set to the exact deployed frontend URL, not a wildcard.

Rate limiting
- Are GET /api/analyze, POST /api/hashtag/generate, and
  POST /api/metatag/generate rate-limited per IP?
  Without this a single user can exhaust the Groq free tier for all
  users or trigger pytrends IP bans.
- Is there a per-IP or per-session limit on POST /api/contact to
  prevent spam submissions to the Supabase contacts table?

Debug code
- Grep every file under frontend/features/ and backend/api/ for
  console.log, print(), and logger.debug(). List every occurrence.
  These must be removed or guarded by an isDev/DEBUG flag.

Export handlers
- frontend/features/export/handlers/exportCsv.ts: are commas, double
  quotes, and newlines inside keyword data properly escaped per RFC 4180?
  AI-generated CSV writers almost always miss edge cases here.

Bundle size
- frontend/app/layout.tsx and any page that imports shadcn/ui: are
  only the used components imported, or is the entire library pulled in?
- Do all images on the landing page (frontend/features/landing/) use
  next/image with explicit width and height props?
- Run `next build` and check the output for any route segment > 200 kB
  first load JS. Report which routes exceed this.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. RECOMMENDED — nice to have
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Error tracking
- Is Sentry (or equivalent) initialised in backend/main.py and in
  frontend/app/layout.tsx? If not, note what to add.

Rollback plan
- Is there a RUNBOOK.md or equivalent that documents:
    (a) which Supabase migration to revert if the deploy breaks?
    (b) how to redeploy the previous Vercel/frontend build?
    (c) how to roll back the FastAPI container?

Admin endpoint protection
- backend/api/cache/cache_router.py exposes a cache-clear endpoint
  with no authentication at all. Even a static secret header
  (X-Admin-Key checked against an env var) would prevent accidental
  or malicious cache wipes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For every issue found, output:

  [SEVERITY] file/path/name.ext · line N
  Problem : plain-English description of what is wrong and why it matters
  Fix     : the minimal code change or config addition required

If a check passes cleanly, write:
  [PASS] check name — one sentence confirming what you verified.

After all four tiers, output a one-paragraph DEPLOY VERDICT:
  HOLD (one or more CRITICAL issues open) or
  CONDITIONAL GO (all CRITICAL resolved, HIGH issues documented)
  listing any blockers by file and line.