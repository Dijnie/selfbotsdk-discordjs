# Phase 2: Update Shared Structures/Managers

## Priority: HIGH | Status: IN PROGRESS

## Overview
Port new methods/features from discord.js v14.16.3 into selfbot's shared files while preserving selfbot-specific code.

## Stats
- 208 files with differences (101 high, 79 medium, 28 low)
- 26 identical files (no work needed)

## Strategy
**Direction:** v14 → selfbot (additive merge, keep selfbot customizations)
**NOT:** Replace selfbot files with v14 files

## Sub-phases (by priority)

### 2A: Structures (87 shared) — MOST IMPACTFUL
High-diff structures to merge carefully:
- Guild.js (1043 lines diff)
- Presence.js (1022 lines)
- Message.js (879 lines)
- User.js (343 lines)
- GuildMember.js, Role.js, GuildChannel.js, etc.

### 2B: Managers (30 shared) — IMPORTANT
- GuildMemberManager.js (637 lines)
- MessageManager.js (460 lines)
- GuildChannelManager.js (432 lines)
- GuildManager.js (332 lines)

### 2C: Client/Actions (102 shared) — MODERATE
- Client.js (1216 lines diff — mostly selfbot auth, careful merge)
- Actions handlers

### 2D: Util (8 shared) — FOUNDATION
- Constants.js (2015 lines diff — need new v14 constants)
- Util.js (1482 lines diff)

## Merge Rules
1. **KEEP** all selfbot-specific methods (captcha, MFA, user account, voice)
2. **ADD** new v14 methods that don't exist in selfbot
3. **UPDATE** shared methods where v14 has improvements
4. **DO NOT** remove selfbot REST layer references (v14 uses @discordjs/rest)
5. **DO NOT** change import paths that reference selfbot's internal modules

## Risk
- HIGH: Breaking existing selfbot functionality during merge
- MEDIUM: Import path mismatches (v14 uses @discordjs/* packages)
- Mitigation: Test after each sub-phase
