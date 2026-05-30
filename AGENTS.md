<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **llm-math-tutor** (240 symbols, 314 relationships, 5 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Security: API Key Handling

**API keys never travel from client to server side.** They are never exposed in browser network requests and cannot be sniffed via DevTools.

- **Node.js (current)**: Express server at `backend/server.ts` reads `GEMINI_API_KEY` from root `.env` via `process.env`. Frontend calls `/api/*` endpoints — keys stay server-side.
- **PHP (alternative)**: `backend/api-proxy.php` reads `GEMINI_API_KEY` from `backend/.env` via `parse_ini_file()`. Frontend calls `/backend/api-proxy.php?action=...` — absolute path from server root, parallel to `/webapps/`. Keys stay server-side.
- Both proxies intermediate all Gemini API connections; the browser never holds or transmits the key.
- `.env` files are gitignored (`.env*` pattern). Only `.env.example` templates are committed.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/llm-math-tutor/context` | Codebase overview, check index freshness |
| `gitnexus://repo/llm-math-tutor/clusters` | All functional areas |
| `gitnexus://repo/llm-math-tutor/processes` | All execution flows |
| `gitnexus://repo/llm-math-tutor/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->