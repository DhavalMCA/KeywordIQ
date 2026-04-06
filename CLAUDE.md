# KeywordIQ — Claude Code Instructions

## `check-vibe` — Pre-Deploy Security & Quality Audit

Run this before any deploy. It performs a full audit of the current project against four severity tiers.

### CRITICAL (block deploy)
- Exposed API keys, secrets, or tokens in any source file or git history
- Unprotected routes — auth checks missing on server-side endpoints
- Broken access control — User A can access User B's data
- Missing server-side input validation (SQL injection, XSS vectors)

### HIGH (fix before real users)
- Env vars used in code but missing from .env.example
- Hard-coded localhost URLs or dev DB strings in production paths
- Stack traces or sensitive data exposed in API error responses
- Unapplied DB migrations or schema mismatches
- N+1 query patterns or missing indexes on large tables

### MEDIUM (fix this week)
- console.log() calls in production code paths
- CORS set to wildcard (*) on any API
- No rate limiting on AI or third-party API calls
- Large unoptimised assets or bloated bundle

### RECOMMENDED
- No error tracking configured (Sentry etc.)
- No rollback plan or deployment notes

For each issue found, output:
- File path + line number
- Plain English explanation of the problem
- The minimal code fix required

---

## Project Context

KeywordIQ is a no-login SEO research tool built on:
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind, shadcn/ui
- **Backend**: FastAPI (Python), Supabase (PostgreSQL + cache)
- **External**: pytrends, Google Autocomplete (httpx), yt-dlp, Groq/Llama3

## Audit Methodology

Read every file in the codebase. For every finding give: file path + line number · plain-English description · minimal fix. Be ruthless. Assume most code was AI-generated and has never been manually verified for security or correctness.

### Secrets & Credentials Checklist
- Is GROQ_API_KEY, SUPABASE_URL, or SUPABASE_KEY present in any committed file (including git history, docker-compose, CI configs)?
- Does .gitignore correctly exclude .env and backend/.env?
- Is NEXT_PUBLIC_API_URL ever hardcoded anywhere in the frontend?

### Input Validation — Server Side Checklist
- `backend/api/keyword/router.py`: does GET /api/analyze validate `q` for max length, allowed characters, and empty/null?
- `backend/api/contact/router.py`: does POST /api/contact enforce field length limits via Pydantic before the Supabase insert?
- `backend/api/hashtag/router.py` and `backend/api/metatag/router.py`: is user-supplied text sanitised before being injected into the Groq prompt string? Check for prompt injection vectors.
- `backend/api/youtube/router.py` and `services/youtube.py`: is the keyword sanitised before being passed to yt-dlp? A shell-escape or argument injection here is a remote code execution risk.

### SQL Injection & XSS Checklist
- Are all Supabase queries using parameterised calls (supabase-py client methods), never raw string interpolation?
- Are any API responses rendered as raw HTML in the frontend (dangerouslySetInnerHTML or equivalent)?

### Environment Variables Checklist
- Does .env.example exist and list every variable used in the codebase: GROQ_API_KEY, SUPABASE_URL, SUPABASE_KEY, NEXT_PUBLIC_API_URL?
- Does `frontend/lib/api-client.ts` fall back to a localhost URL when NEXT_PUBLIC_API_URL is unset, or does it fail loudly?

### Hard-coded Dev Values Checklist
- Search all files for "localhost", "127.0.0.1", "supabase.co/project/", "http://" (non-TLS URLs). Flag every occurrence with file + line.

### Error Handling Checklist
- Does `backend/core/exceptions.py` return a generic error message in production, or does FastAPI's default handler leak the full Python traceback to the HTTP response?
- Do frontend error boundaries (per feature, not global) catch errors without exposing raw error objects in the UI?

### Database Checklist
- Does the Supabase cache table have a composite index on (normalised_keyword, created_at)? Without it every cache check is a full table scan.
- Does the contacts table have an index on created_at if it will be queried for admin views?
- Are all migrations applied and matching the current schema?
- Are there N+1 patterns anywhere asyncio.gather() results are further fetched row-by-row from Supabase?

### Timeouts Checklist
- `backend/api/keyword/service.py`: does asyncio.gather() have per-task timeouts via asyncio.wait_for()? pytrends and yt-dlp can hang indefinitely, blocking the entire response.
- `backend/api/keyword/services/pytrends.py` and `youtube.py`: are the asyncio.to_thread() calls wrapped with a timeout?

### CORS Checklist
- `backend/core/middleware.py`: is allow_origins set to ["*"]? It must be set to the exact deployed frontend URL, not a wildcard.

### Rate Limiting Checklist
- Are GET /api/analyze, POST /api/hashtag/generate, and POST /api/metatag/generate rate-limited per IP? Without this a single user can exhaust the Groq free tier for all users or trigger pytrends IP bans.
- Is there a per-IP or per-session limit on POST /api/contact to prevent spam submissions to the Supabase contacts table?

### Debug Code Checklist
- Grep every file under `frontend/features/` and `backend/api/` for console.log, print(), and logger.debug(). List every occurrence. These must be removed or guarded by an isDev/DEBUG flag.

### Export Handlers Checklist
- `frontend/features/export/handlers/exportCsv.ts`: are commas, double quotes, and newlines inside keyword data properly escaped per RFC 4180? AI-generated CSV writers almost always miss edge cases here.

### Bundle Size Checklist
- `frontend/app/layout.tsx` and any page that imports shadcn/ui: are only the used components imported, or is the entire library pulled in?
- Do all images on the landing page (`frontend/features/landing/`) use next/image with explicit width and height props?

### Error Tracking Checklist
- Is Sentry (or equivalent) initialised in `backend/main.py` and in `frontend/app/layout.tsx`?

### Admin Endpoint Protection Checklist
- `backend/api/cache/cache_router.py` exposes a cache-clear endpoint with no authentication at all. Even a static secret header (X-Admin-Key checked against an env var) would prevent accidental or malicious cache wipes.

---

## Output Format

For every issue found, output:

```
[SEVERITY] file/path/name.ext · line N
Problem : plain-English description of what is wrong and why it matters
Fix     : the minimal code change or config addition required
```

If a check passes cleanly, write:
```
[PASS] check name — one sentence confirming what you verified.
```

After all four tiers, output a one-paragraph DEPLOY VERDICT:
- HOLD (one or more CRITICAL issues open) or
- CONDITIONAL GO (all CRITICAL resolved, HIGH issues documented)
- listing any blockers by file and line.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes � gives risk-scored analysis |
| `get_review_context` | Need source snippets for review � token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
