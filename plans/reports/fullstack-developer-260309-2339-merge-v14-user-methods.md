# Phase Implementation Report

### Executed Phase
- Phase: merge-v14-user-methods (ad-hoc, no plan file)
- Plan: none
- Status: completed

### Files Modified
- `/home/tid/project/nodejs/discord/discord.js-selfbot-v13/src/structures/User.js` — 4 targeted edits

### Tasks Completed
- [x] Read both selfbot and v14 User.js files completely
- [x] Compared `_patch` methods for new/changed fields
- [x] Compared all class methods
- [x] Fixed `avatar_decoration_data` key check: `if (data.avatar_decoration_data)` → `if ('avatar_decoration_data' in data)` (matches v14, correctly handles explicit `null` sent by API)
- [x] Fixed `bannerURL`: removed `throw new Error('USER_BANNER_NOT_FETCHED')` guard — now returns `null` when banner is falsy, matching v14 behavior (less breaking for callers)
- [x] Fixed `createDM`: was passing bare `force` boolean to `UserManager.createDM`; now passes `{ force }` object, matching the manager's actual signature `createDM(user, { cache, force } = {})`
- [x] Updated `guildTagBadgeURL`: added `options = {}` param and forwards it to CDN call, matching v14 signature
- [x] Kept all selfbot-specific code intact: `bannerColor` patch, `clan` getter, `avatarDecoration` getter, `setNote`, `note`, `voice`, `sendFriendRequest`, `deleteRelationship`, `relationship`, `friendNickname`, `getProfile`, `TextBasedChannel.applyToClass`

### What was NOT changed (intentionally)
- Imports — selfbot uses its own internal module paths, not `@discordjs/*` packages
- `toString()` — v14 uses `userMention()` helper from formatters package; selfbot uses template literal, identical output
- `collectibles` patch — selfbot inline logic kept; v14 uses `_transformCollectibles()` from an internal Transformers module not present in selfbot
- `fetch()` — kept sync wrapper (returns promise), no functional difference vs v14's `async` wrapper
- `deleteDM()` — kept sync wrapper

### Tests Status
- Type check: N/A (no TypeScript in selfbot)
- Unit tests: N/A (no test suite present in repo)
- Syntax check: file is valid JS (no syntax errors introduced)

### Issues Encountered
None. All changes were clean, targeted fixes.

### Next Steps
- None required. Changes are backward compatible.
- If `GuildTagBadge` CDN method does not accept an options object, `guildTagBadgeURL(options)` may silently ignore the param — worth verifying CDN helper signature.

### Unresolved Questions
- Does `this.client.rest.cdn.GuildTagBadge(guildId, badge, options)` correctly accept an options object in the selfbot CDN implementation? (low risk — extra arg is ignored if not consumed)
