# Phase Implementation Report

### Executed Phase
- Phase: merge-v14-manager-methods
- Plan: none (direct task)
- Status: completed

### Files Modified

| File | Lines Added | Lines Removed |
|------|-------------|---------------|
| `src/managers/GuildMemberManager.js` | +49 | 0 |
| `src/managers/GuildManager.js` | +15 | 0 |
| `src/managers/GuildChannelManager.js` | +36 | -3 (addFollower return type improvement) |

### Tasks Completed

- [x] GuildMemberManager: added `list({ after, limit, cache })` — lists up to 1000 members via REST GET
- [x] GuildMemberManager: added `editMe({ reason, ...options })` — dedicated method for editing the current user's guild member (nick, avatar, banner, bio)
- [x] GuildManager: added `widgetImageURL(guild, style)` — returns widget PNG URL; uses `client.options.http.api/version` to build URL (selfbot REST pattern)
- [x] GuildChannelManager: updated `addFollower()` return type from `Snowflake` to `FollowedChannelData` `{ channelId, webhookId }` — matching v14 improvement
- [x] GuildChannelManager: added `FetchedThreads` typedef + `fetchActiveThreads(cache)` — calls `/guilds/{id}/threads/active` and delegates to `ThreadManager._mapThreads()`
- [x] All selfbot-specific code preserved (fetchByMemberSafety, selfbot's fetch() with permission check, etc.)
- [x] All imports unchanged (selfbot pattern, no @discordjs/* REST imports added)

### Skipped (not applicable)

- `fetchSoundboardSounds()` in GuildManager: requires `Events.SOUNDBOARD_SOUNDS` event (absent in selfbot Constants), `Map.groupBy()` (Node 21+ API), and `ws.getShardCount()` (v14 WS API). Adding stub would be non-functional.

### Tests Status
- Syntax check (`node -c`): **PASS** — all 3 files

### Issues Encountered
None. All new methods use the selfbot `this.client.api.*` REST pattern (not `@discordjs/rest`).

### Next Steps
None — purely additive merge complete.
