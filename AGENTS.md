# AGENTS — Invision Creative

Use this file so automated agents (Cursor, CI bots, etc.) align with repo intent.

## Product

- **Repo:** Invision Creative — photography, video, social/content, AI integrations.
- **Sibling brand:** Invision Marketing (`https://invisionmarketing.io/`) — SEO, paid media, lead-focused web. Same monogram family; Creative uses **green**, Marketing uses **purple** on their site.

## Repository layout

| Path | Role |
|------|------|
| `web/` | Next.js 16 application (deploy from this folder). |
| `docs/WEBSITE_LAYOUT.md` | Route map, UX principles, asset notes. |
| `.cursor/rules/` | Cursor rules (always-on project conventions). |
| `.cursor/skills/invision-creative/` | Project skill for Invision-specific workflows. |

## Implementation conventions

- TypeScript, App Router, Tailwind v4.
- **Unified light theme sitewide:** as per user request, background is white and content is dark or green. Only exception is a specific black section on the home page.
- **Visual-first:** prefer image/video placeholders and short labels; avoid long marketing copy on `/`, `/work`, `/services`.
- **Cross-link:** Footer and About reference Marketing; header **Brand switch** links Marketing ↔ Creative (Creative is this deployment; Marketing is external).

## Reciprocal link (Marketing site)

To complete the “switch” in both directions, add on **invisionmarketing.io** (their stack): a matching control or link to the Creative URL once production domain is final. This repo only implements the Creative side.

## Commands

```bash
cd web
npm install
npm run dev
npm run build
```
