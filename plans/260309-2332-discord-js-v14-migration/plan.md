# Discord.js v14.16.3 Migration Plan

## Goal
Port discord.js v14.16.3 methods/features into selfbot `src/`, upgrade API v9→v10, while preserving selfbot-specific code.

## Source Reference
- **discord.js 14.16.3:** `./discord.js/src/` (329 files)
- **Selfbot current:** `./src/` (357 files, based on djs@13.17 + v14.21.0 backports)

## Phases

| Phase | Description | Status | Files |
|-------|-------------|--------|-------|
| 1 | [API v9 → v10](phase-01-api-v10-migration.md) | DONE | ~10 core files |
| 2 | [Update shared structures/managers](phase-02-update-shared-files.md) | IN PROGRESS | ~220 files |
| 3 | [Add new v14 features](phase-03-add-v14-features.md) | IN PROGRESS | ~25 new files |
| 4 | [Modernize flags/components](phase-04-modernize-architecture.md) | DONE | ~16 files |

## Constraints
- **KEEP:** All selfbot-specific code (voice, user account, REST layer, user WS handlers)
- **KEEP:** Internal REST implementation (selfbot needs custom headers, captcha, MFA)
- **UPDATE:** Methods, constants, endpoints from discord.js v14.16.3
- **UPDATE:** API version from v9 to v10
- **ADD:** New v14 features that work with user accounts

## Architecture Notes
- discord.js v14 uses `@discordjs/rest` (external) — selfbot keeps internal REST (7 files)
- discord.js v14 uses `@discordjs/ws` — selfbot keeps internal WebSocket
- Selfbot REST adds: captcha handling, MFA tokens, x-super-properties, browser fingerprinting
