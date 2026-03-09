# Phase 4: Modernize Flags & Components

## Priority: MEDIUM | Status: DONE

## Overview
Port v14.16.3 flag/component modernizations into selfbot while preserving backward compatibility.

## Sub-phases

### 4A: BitField Modernization (1 file) — DONE
- [x] `src/util/BitField.js` — Added `Flags` getter aliasing `FLAGS`, `DefaultBit` aliasing `defaultBit`, improved serialize/toArray to skip numeric keys

### 4B: Flag Value Updates (5 files updated + 1 created) — DONE
Updated flags with missing v14 values:
- [x] `src/util/ChannelFlags.js` — Added GUILD_FEED_REMOVED, ACTIVE_CHANNELS_REMOVED, IS_SPAM, IS_GUILD_RESOURCE_CHANNEL, CLYDE_AI, IS_SCHEDULED_FOR_DELETION, HIDE_MEDIA_DOWNLOAD_OPTIONS
- [x] `src/util/GuildMemberFlags.js` — Added IS_GUEST, STARTED_HOME_ACTIONS, COMPLETED_HOME_ACTIONS, AUTOMOD_QUARANTINED_*, DM_SETTINGS_UPSELL_ACKNOWLEDGED
- [x] `src/util/ThreadMemberFlags.js` — Added HAS_INTERACTED, ALL_MESSAGES, ONLY_MENTIONS, NO_MESSAGES
- [x] `src/util/Intents.js` — Added GUILD_MESSAGE_POLLS, DIRECT_MESSAGE_POLLS
- [x] `src/util/Permissions.js` — Added PIN_MESSAGES, BYPASS_SLOWMODE
- [x] `src/util/SKUFlags.js` — CREATED (AVAILABLE, GUILD_SUBSCRIPTION, USER_SUBSCRIPTION)
Already up-to-date: ActivityFlags, ApplicationFlags, AttachmentFlags, InviteFlags, MessageFlags, RoleFlags, SystemChannelFlags, UserFlags

### 4C: Typed Select Menu Interactions (5 files) — DONE
- [x] `src/structures/StringSelectMenuInteraction.js` — Created
- [x] `src/structures/UserSelectMenuInteraction.js` — Created (resolves users/members)
- [x] `src/structures/RoleSelectMenuInteraction.js` — Created (resolves roles)
- [x] `src/structures/MentionableSelectMenuInteraction.js` — Created (resolves users/roles/members)
- [x] `src/structures/ChannelSelectMenuInteraction.js` — Created (resolves channels)

### 4D: Interaction Type Checking (1 file) — DONE
- [x] `src/structures/Interaction.js` — Added isAnySelectMenu(), isStringSelectMenu(), isUserSelectMenu(), isRoleSelectMenu(), isMentionableSelectMenu(), isChannelSelectMenu(); deprecated isSelectMenu() as alias

### 4E: Wiring & Exports (2 files) — DONE
- [x] `src/index.js` — Exported all new interactions + SKUFlags + MessageSelectMenu
- [x] `src/structures/SKU.js` — Wired SKUFlags to SKU.flags as frozen BitField

## Verification
- [x] All 182 exports load via `require('./src/index.js')`
- [x] All 14 flag classes pass Flags alias test
- [x] Zero lint errors on all changed/new files
- [x] SKU.flags is proper SKUFlags BitField instance
- [x] All Interaction type-check methods available
