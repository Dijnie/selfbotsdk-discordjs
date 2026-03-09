# Phase 3: Add New v14 Features

## Priority: MEDIUM | Status: IN PROGRESS

## Overview
Add new discord.js v14.16.3 structures, managers, and actions that don't exist in the selfbot yet.

## Scope Summary
- **New structures:** ~10 files (Soundboard, Onboarding, Entitlement, SKU, Subscription, etc.)
- **New managers:** ~5 files
- **New actions:** ~1 file
- **New components:** LabelComponent
- **Skip:** Bot-only features (AutoMod, Autocomplete, ClientApplication, PrimaryEntryPoint)

## Already Exists in Selfbot (no work needed)
- Poll.js, PollAnswer.js — already ported
- ContainerComponent.js, FileComponent.js, MediaGalleryComponent.js, etc.
- MediaChannel.js, ForumChannel.js

## Sub-phases

### 3A: Guild Onboarding (3 files) — DONE
- [x] `src/structures/GuildOnboarding.js`
- [x] `src/structures/GuildOnboardingPrompt.js`
- [x] `src/structures/GuildOnboardingPromptOption.js`

### 3B: Soundboard (2+1 files) — DONE
- [x] `src/structures/SoundboardSound.js`
- [x] `src/managers/GuildSoundboardSoundManager.js`
- [x] `src/client/actions/GuildSoundboardSoundDelete.js`
- [x] Wired `Guild.soundboardSounds` manager property

### 3C: Monetization (3 structure files) — DONE
- [x] `src/structures/Entitlement.js`
- [x] `src/structures/SKU.js`
- [x] `src/structures/Subscription.js`
- [ ] `src/managers/EntitlementManager.js` — skipped (requires bot application context)
- [ ] `src/managers/SubscriptionManager.js` — skipped (requires bot application context)

### 3D: Invite Refactor (3 files) — DEFERRED
- [ ] `src/structures/BaseInvite.js` — selfbot already has Invite.js, refactor deferred
- [ ] `src/structures/GuildInvite.js` — deferred
- [ ] `src/structures/GroupDMInvite.js` — deferred

### 3E: Misc Structures — DONE
- [x] `src/structures/LabelComponent.js` — new component type (type 18)
- [x] `src/structures/AnnouncementChannel.js` — alias for NewsChannel
- [x] `src/structures/ApplicationEmoji.js` — application emoji
- [x] `src/managers/ApplicationEmojiManager.js` — manage app emojis
- [ ] `src/structures/GuildAuditLogsEntry.js` — deferred (selfbot has Entry in GuildAuditLogs)

### 3F: Specialized Managers — PARTIALLY DONE
- [x] `src/managers/CategoryChannelChildManager.js` — category children
- [x] `src/managers/PollAnswerVoterManager.js` — poll voters (wired to PollAnswer.voters)
- [ ] `src/managers/DMMessageManager.js` — deferred (trivial subclass, low value)
- [ ] `src/managers/GuildMessageManager.js` — deferred (crosspost uses v14 REST)

### 3G: Constants & Wiring — DONE
- [x] Added `MessageComponentTypes.LABEL` (type 18)
- [x] Added `GuildOnboardingModes` enum
- [x] Added `GuildOnboardingPromptTypes` enum
- [x] Added `EntitlementTypes` enum
- [x] Added `SKUTypes` enum
- [x] Added `SubscriptionStatuses` enum
- [x] Added soundboard event constants
- [x] Registered all new exports in `src/index.js`
- [x] Registered `GuildSoundboardSoundDelete` action in `ActionsManager`
- [x] Added `BaseMessageComponent.create()` LABEL case

## Verification
- All new files pass lint (0 errors)
- All exports load successfully via `require('./src/index.js')`
- Guild.soundboardSounds manager initializes correctly
- Pre-existing lint errors: 227 (unchanged from before)

## Deferred Items
- **Invite refactor** (3D): Selfbot has a working Invite.js. The v14 split into BaseInvite/GuildInvite/GroupDMInvite is a refactor that could break existing code. Defer to Phase 4.
- **EntitlementManager/SubscriptionManager**: Require `client.application` which is bot-specific. Structures are available for data parsing.
- **DMMessageManager/GuildMessageManager**: Thin subclasses with low value-add for selfbot.
- **GuildAuditLogsEntry**: Already available as `GuildAuditLogs.Entry` in selfbot.
