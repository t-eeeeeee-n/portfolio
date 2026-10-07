# Codex repository guide

This repository supports both Claude Code and Codex. Keep the two environments compatible.

## Start here

- Read `CLAUDE.md` before implementation work. It is the shared project guide and contains the current architecture, content rules, source-of-truth files, commands, and product decisions.
- Read the relevant file under `docs/` before changing design, content structure, or architecture.
- Treat implementation files as the source of truth when documentation and code disagree. Report the mismatch instead of silently copying stale documentation.

## Compatibility

- Do not delete, rename, or rewrite `CLAUDE.md` or `.claude/` unless the user explicitly asks for a Claude-side change.
- Put Codex project instructions in `AGENTS.md`, private local overrides in `AGENTS.override.md`, reusable repo skills in `.agents/skills/`, and project-scoped custom agents in `.codex/agents/`.
- Files or directories containing `.local` are private working material. Do not force-add them to Git or move their contents into tracked files without explicit approval.

## Repository constraints

- Use `pnpm`; the required version is declared in `package.json`.
- For code changes, run the smallest relevant checks, normally `pnpm lint` and `pnpm typecheck`.
- Do not run repository-wide `pnpm format` as routine verification. The repository has pre-existing formatting drift and that command creates unrelated changes.
- Preserve unrelated working-tree changes.
- Availability copy has one source of truth: `lib/availability.ts`. Do not duplicate or independently edit the same wording elsewhere.
- Do not alter the brand name, `BrandMark`, Zone naming, resume PDF content, Notes URL structure, availability terms, `tmp/`, paid services, or domain strategy without user approval. See `CLAUDE.md` for the complete constraints and rationale.

## Privacy and external actions

- Treat `JOBHUNT.local.md`, other `*.local.*` files, resumes, contact data, and job-platform state as private.
- Never include private job-hunt material in a commit, public page, build output, or deployment.
- Reading and analysis may proceed when requested. Before sending a message, submitting an application or form, uploading a personal file, changing a public profile, scheduling an interview, or creating a social connection, show the exact action and obtain confirmation at action time.
- Never force-add an ignored file with `git add -f`.
