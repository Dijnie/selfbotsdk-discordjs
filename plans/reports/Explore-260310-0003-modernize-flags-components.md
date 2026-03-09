# Explore Report: Modernize Flags & Components

**Status**: Complete exploration of v14 to selfbot flag & component migration requirements

---

## Executive Summary

The "Modernize flags/components" task involves migrating discord.js v14.16.3 flag and component implementations into the selfbot codebase. The key differences are:

1. **Flags Architecture**: v14 uses `*FlagsBitField` classes (e.g., `MessageFlagsBitField`) extending from a base `BitField` that imports from `discord-api-types/v10`. Selfbot uses simpler `*Flags` classes with manually defined `FLAGS` objects.

2. **Components**: v14 has a unified component system with `Component` base class and specific component types (ButtonComponent, StringSelectMenuComponent, etc.). Selfbot has older `MessageButton`, `MessageSelectMenu`, `MessageActionRow` pattern with `BaseMessageComponent` base class.

3. **Count**: ~40+ files need updates across flags, components, builders, and dependent structures.

---

## 1. FLAGS FILES COMPARISON

### V14 FlagsBitField Implementation (12 files)
Located in: `/home/tid/project/nodejs/discord/discord.js-selfbot-v13/discord.js/src/util/`

All v14 flags follow pattern:
```javascript
// Example: MessageFlagsBitField.js
const { MessageFlags } = require('discord-api-types/v10');
const { BitField } = require('./BitField.js');

class MessageFlagsBitField extends BitField {
  static Flags = MessageFlags;  // Imported from discord-api-types
}
```

**V14 Flags Files (12 total)**:
- ActivityFlagsBitField.js
- ApplicationFlagsBitField.js
- AttachmentFlagsBitField.js
- ChannelFlagsBitField.js
- GuildMemberFlagsBitField.js
- IntentsBitField.js
- InviteFlagsBitField.js
- MessageFlagsBitField.js
- PermissionsBitField.js
- RoleFlagsBitField.js
- SKUFlagsBitField.js (NEW in v14, not in selfbot)
- SystemChannelFlagsBitField.js
- ThreadMemberFlagsBitField.js
- UserFlagsBitField.js

### Selfbot Flags Implementation (13 files)
Located in: `/home/tid/project/nodejs/discord/discord.js-selfbot-v13/src/util/`

Selfbot flags define FLAGS inline:
```javascript
// Example: MessageFlags.js
const BitField = require('./BitField');

class MessageFlags extends BitField {}

MessageFlags.FLAGS = {
  CROSSPOSTED: 1 << 0,
  IS_CROSSPOST: 1 << 1,
  // ... etc
};
```

**Selfbot Flags Files (13 total)**:
- ActivityFlags.js
- ApplicationFlags.js
- AttachmentFlags.js
- ChannelFlags.js
- GuildMemberFlags.js
- Intents.js (equivalent to IntentsBitField)
- InviteFlags.js
- MessageFlags.js
- Permissions.js (equivalent to PermissionsBitField)
- PremiumUsageFlags.js (selfbot-specific)
- PurchasedFlags.js (selfbot-specific)
- RoleFlags.js
- SystemChannelFlags.js
- ThreadMemberFlags.js
- UserFlags.js

### Gap Analysis: Flags to Migrate

**New in V14 (1 file)**:
- SKUFlagsBitField.js - Must create `/src/util/SKUFlags.js`

**Modernization Pattern**:
All 12 existing selfbot flag files need conversion from:
```javascript
class MessageFlags extends BitField {}
MessageFlags.FLAGS = { ... }
```

To v14 pattern:
```javascript
class MessageFlagsBitField extends BitField {
  static Flags = <imported from discord-api-types/v10>
}
```

---

## 2. COMPONENTS FILES COMPARISON

### V14 Component Architecture (26 files in structures/)

**Base Classes**:
- Component.js (base for all components)
- BaseSelectMenuComponent.js (base for select menu types)

**Interactive Components** (respond to user interaction):
- ActionRow.js (container for message components)
- ButtonComponent.js
- StringSelectMenuComponent.js
- UserSelectMenuComponent.js
- RoleSelectMenuComponent.js
- MentionableSelectMenuComponent.js
- ChannelSelectMenuComponent.js
- TextInputComponent.js

**Modal Components** (Rich formatting in modals):
- ContainerComponent.js
- FileComponent.js
- LabelComponent.js
- MediaGalleryComponent.js
- SectionComponent.js
- SeparatorComponent.js
- TextDisplayComponent.js
- ThumbnailComponent.js

**Interactions**:
- MessageComponentInteraction.js
- ButtonInteraction.js
- ChannelSelectMenuInteraction.js
- MentionableSelectMenuInteraction.js
- RoleSelectMenuInteraction.js
- StringSelectMenuInteraction.js
- UserSelectMenuInteraction.js
- ModalComponentResolver.js

**Utility**:
- Components.js (createComponent factory, extractInteractiveComponents, findComponentByCustomId)

### Selfbot Component Architecture (12 files in structures/)

**Legacy Pattern** (v13 components):
- BaseMessageComponent.js (base class)
- MessageButton.js (not ButtonComponent)
- MessageSelectMenu.js (not StringSelectMenuComponent)
- MessageActionRow.js (not ActionRow)
- TextInputComponent.js (shared)

**Modal Components**:
- ContainerComponent.js (shared)
- FileComponent.js (shared)
- LabelComponent.js (shared)
- MediaGalleryComponent.js (shared)
- SectionComponent.js (shared)
- SeparatorComponent.js (shared)
- TextDisplayComponent.js (shared)
- ThumbnailComponent.js (shared)

**Interactions**:
- ButtonInteraction.js
- MessageComponentInteraction.js
- SelectMenuInteraction.js (not specific types)
- ModalSubmitInteraction.js
- InteractionCollector.js

**Key Differences**:
1. Selfbot uses `MessageButton`, `MessageSelectMenu`, `MessageActionRow` names (legacy)
2. V14 uses specific component classes: `ButtonComponent`, `StringSelectMenuComponent`, `ActionRow`
3. V14 has 7 new select menu interaction types (UserSelectMenuInteraction, RoleSelectMenuInteraction, etc.)
4. V14 has unified Component base vs. selfbot's BaseMessageComponent
5. V14 uses generic type names without "Message" prefix

### Components to Migrate or Create (15+ files)

**Need Update/Rename**:
- MessageButton.js → Align with ButtonComponent pattern
- MessageSelectMenu.js → Align with StringSelectMenuComponent pattern
- MessageActionRow.js → Align with ActionRow pattern
- BaseMessageComponent.js → May need alignment with Component base

**Need to Create/Backport**:
- ButtonComponent.js (modern v14 pattern)
- StringSelectMenuComponent.js (modern pattern)
- UserSelectMenuComponent.js (new)
- RoleSelectMenuComponent.js (new)
- MentionableSelectMenuComponent.js (new)
- ChannelSelectMenuComponent.js (new)
- BaseSelectMenuComponent.js (new base)
- Component.js (new modern base) - or refactor existing

**Need to Create Interactions**:
- UserSelectMenuInteraction.js (new)
- RoleSelectMenuInteraction.js (new)
- MentionableSelectMenuInteraction.js (new)
- ChannelSelectMenuInteraction.js (new)
- ChatInputCommandInteraction.js (new)
- ContextMenuCommandInteraction.js (new)
- PrimaryEntryPointCommandInteraction.js (new)
- And update existing SelectMenuInteraction to be generic or abstract

---

## 3. DEPENDENT STRUCTURES & MANAGERS

### Structures Using Flags (20+ files)
Files that import and use flags:
- Message.js (MessageFlags for message.flags)
- User.js (UserFlags for user.flags)
- Role.js (RoleFlags for role.flags)
- GuildMember.js (GuildMemberFlags for member.flags)
- ApplicationCommand.js (ApplicationFlags)
- Attachment.js (AttachmentFlags for attachment.flags)
- Activity.js (ActivityFlags for presence.activities)
- Channel.js (ChannelFlags for channel.flags)
- SystemChannel methods (SystemChannelFlags)
- ThreadMember.js (ThreadMemberFlags)
- Invite.js (InviteFlags)
- Guild.js (various flags)
- ClientUser.js (UserFlags, ApplicationFlags)
- SKU.js (will need SKUFlags)

### Structures Using Components (30+ files)
Files that create, parse, or use components:
- Message.js (contains component arrays)
- MessagePayload.js (serializes components)
- Modal.js (contains components)
- Interaction.js / BaseCommandInteraction.js (handles component data)
- ButtonInteraction.js (extends from component interaction)
- SelectMenuInteraction.js (extends from component interaction)
- ModalSubmitInteraction.js
- InteractionCollector.js (collects component interactions)

### Managers to Check (10+ files)
Managers that may need updates:
- ReactionManager.js (related to message interactions)
- InteractionManager.js (new manager to consider)

---

## 4. UTILITY EXPORTS & INDEX FILES

### V14 Index Exports (discord.js/src/index.js)
Exports all FlagsBitField classes:
```javascript
exports.ActivityFlagsBitField = require('./util/ActivityFlagsBitField.js').ActivityFlagsBitField;
exports.ApplicationFlagsBitField = require('./util/ApplicationFlagsBitField.js').ApplicationFlagsBitField;
// ... 12 more flag exports
exports.SKUFlagsBitField = require('./util/SKUFlagsBitField.js').SKUFlagsBitField;
// Plus all component exports...
```

### Selfbot Index Exports (src/index.js)
Exports simpler Flags names:
```javascript
exports.ActivityFlags = require('./util/ActivityFlags');
exports.ApplicationFlags = require('./util/ApplicationFlags');
// ... 13 flag exports
exports.PurchasedFlags = require('./util/PurchasedFlags');
```

**Action Required**:
1. Update index.js exports to use `*FlagsBitField` naming for consistency with v14
2. Add SKUFlagsBitField export
3. Update all component exports to match v14 structure

---

## 5. COMPLETE FILE LIST FOR MODERNIZATION

### Flags Utility Files (13-14 files to update + 1 to create)
**Update existing** (convert to v14 BitField pattern with discord-api-types):
1. `/src/util/ActivityFlags.js` → ActivityFlagsBitField
2. `/src/util/ApplicationFlags.js` → ApplicationFlagsBitField
3. `/src/util/AttachmentFlags.js` → AttachmentFlagsBitField
4. `/src/util/ChannelFlags.js` → ChannelFlagsBitField
5. `/src/util/GuildMemberFlags.js` → GuildMemberFlagsBitField
6. `/src/util/Intents.js` → IntentsBitField
7. `/src/util/InviteFlags.js` → InviteFlagsBitField
8. `/src/util/MessageFlags.js` → MessageFlagsBitField
9. `/src/util/Permissions.js` → PermissionsBitField
10. `/src/util/RoleFlags.js` → RoleFlagsBitField
11. `/src/util/SystemChannelFlags.js` → SystemChannelFlagsBitField
12. `/src/util/ThreadMemberFlags.js` → ThreadMemberFlagsBitField
13. `/src/util/UserFlags.js` → UserFlagsBitField

**Create new**:
14. `/src/util/SKUFlagsBitField.js` (from discord-api-types/v10)

### Component Structure Files (22+ files to update/create)
**Update/Modernize existing**:
1. `/src/structures/BaseMessageComponent.js` → Align with Component pattern
2. `/src/structures/MessageButton.js` → ButtonComponent pattern
3. `/src/structures/MessageSelectMenu.js` → StringSelectMenuComponent pattern
4. `/src/structures/MessageActionRow.js` → ActionRow pattern

**Create new component types**:
5. `/src/structures/Component.js` (base, modern pattern)
6. `/src/structures/BaseSelectMenuComponent.js` (abstract base)
7. `/src/structures/StringSelectMenuComponent.js`
8. `/src/structures/UserSelectMenuComponent.js`
9. `/src/structures/RoleSelectMenuComponent.js`
10. `/src/structures/MentionableSelectMenuComponent.js`
11. `/src/structures/ChannelSelectMenuComponent.js`

**Create new interaction types**:
12. `/src/structures/ButtonInteraction.js` (may need updates)
13. `/src/structures/UserSelectMenuInteraction.js`
14. `/src/structures/RoleSelectMenuInteraction.js`
15. `/src/structures/MentionableSelectMenuInteraction.js`
16. `/src/structures/ChannelSelectMenuInteraction.js`

**Create/Update command interactions**:
17. `/src/structures/ChatInputCommandInteraction.js`
18. `/src/structures/ContextMenuCommandInteraction.js`
19. `/src/structures/PrimaryEntryPointCommandInteraction.js`
20. `/src/structures/CommandInteractionOptionResolver.js`
21. `/src/structures/AutocompleteInteraction.js`

### Dependent Structures (20+ files to update)
Files needing flag/component reference updates:
22. `/src/structures/Message.js` (flags, components)
23. `/src/structures/User.js` (flags)
24. `/src/structures/Role.js` (flags)
25. `/src/structures/GuildMember.js` (flags)
26. `/src/structures/ApplicationCommand.js` (flags)
27. `/src/structures/Attachment.js` (flags)
28. `/src/structures/Activity.js` (flags)
29. `/src/structures/Channel.js` (flags)
30. `/src/structures/ThreadMember.js` (flags)
31. `/src/structures/Invite.js` (flags)
32. `/src/structures/Guild.js` (multiple flags)
33. `/src/structures/ClientUser.js` (flags)
34. `/src/structures/SKU.js` (will need SKUFlags)
35. `/src/structures/MessagePayload.js` (component serialization)
36. `/src/structures/Modal.js` (components)
37. `/src/structures/Interaction.js` (component handling)
38. `/src/structures/BaseCommandInteraction.js` (component handling)
39. `/src/structures/ModalSubmitInteraction.js` (components)

### Utilities & Index Files (3-5 files)
40. `/src/util/BitField.js` (may need updates)
41. `/src/index.js` (export updates)
42. `/src/util/Constants.js` (component type constants)
43. `/src/util/Components.js` (new component factory/utilities - if creating)

---

## 6. KEY ARCHITECTURAL CHANGES NEEDED

### Flags Pattern Modernization

**Current (Selfbot)**:
```javascript
class MessageFlags extends BitField {}
MessageFlags.FLAGS = { CROSSPOSTED: 1 << 0, ... };
```

**Target (V14)**:
```javascript
const { MessageFlags } = require('discord-api-types/v10');
const { BitField } = require('./BitField.js');

class MessageFlagsBitField extends BitField {
  static Flags = MessageFlags;  // From discord-api-types
}
exports.MessageFlagsBitField = MessageFlagsBitField;
```

**Benefits**:
- Single source of truth in `discord-api-types/v10` (official Discord API types)
- Flags defined in TypeScript types, synced automatically with API updates
- Proper naming convention (*FlagsBitField)

### Components Pattern Modernization

**Current (Selfbot)**:
```javascript
class MessageButton extends BaseMessageComponent { ... }
class MessageSelectMenu extends BaseMessageComponent { ... }
class MessageActionRow extends BaseMessageComponent { ... }
```

**Target (V14)**:
```javascript
// Generic base
class Component { ... }

// Specific components
class ButtonComponent extends Component { ... }
class StringSelectMenuComponent extends BaseSelectMenuComponent { ... }
class ActionRow extends Component { ... }

// Factory for creation
function createComponent(data) {
  return new (ComponentTypeToClass[data.type] ?? Component)(data);
}
```

**Benefits**:
- Unified component system across modals and messages
- Type-safe component creation via factory
- Support for new component types (User/Role/Mentionable/Channel select menus)
- Easier to add new component types in future

---

## 7. IMPLEMENTATION PRIORITY

**Phase 1: Flags Modernization (14 files)**
- Rename all Flags.js files to use `*FlagsBitField.js` naming
- Update class names and exports
- Import flag definitions from `discord-api-types/v10`
- Update all 20+ dependent structures to use new flag names

**Phase 2: Component Base Infrastructure (3-5 files)**
- Create/update `Component.js` base class
- Create `BaseSelectMenuComponent.js`
- Update component utility functions (factory, extractors)
- Create Components.js with createComponent factory if not present

**Phase 3: Component Types (11 files)**
- Create all 7 new select menu component types
- Update existing MessageButton → ButtonComponent migration
- Update existing MessageSelectMenu → StringSelectMenuComponent
- Update MessageActionRow → ActionRow

**Phase 4: Interaction Types (5 files)**
- Create 4 new select menu interaction types
- Create 3 command interaction types
- Update generic SelectMenuInteraction handling

**Phase 5: Dependent Updates (20+ files)**
- Update all structures using flags to use new naming
- Update all structures using components to support new types
- Update interaction handling for new types

**Phase 6: Index & Exports (2-3 files)**
- Update src/index.js to export all *FlagsBitField classes
- Export all new component classes
- Maintain backward compatibility aliases if needed

---

## 8. SUMMARY STATISTICS

| Category | Count | Status |
|----------|-------|--------|
| Flags Files to Update | 13 | Rename + pattern change |
| Flags Files to Create | 1 | SKUFlagsBitField |
| Component Files to Create | 7 | Select menu components |
| Interaction Files to Create | 4 | New select menu interactions |
| Command Interaction Files | 3 | New command interactions |
| Dependent Structures | 20+ | Require reference updates |
| Utility Files | 3-5 | Index, constants, factory |
| **Total Files Affected** | **~55-60** | Migration scope |

---

## 9. UNRESOLVED QUESTIONS

1. **Backward Compatibility**: Should old `MessageFlags`, `MessageButton`, etc. names be maintained as aliases for backward compatibility, or is breaking change acceptable?

2. **Custom Selfbot Flags**: How to handle `PremiumUsageFlags` and `PurchasedFlags` that are selfbot-specific and not in discord-api-types? Should they remain as custom implementations?

3. **Component Factory Location**: Should Components.js factory be a new utility file or integrated into existing utilities?

4. **MessageSelectMenu Variants**: V14 has unified select menus (StringSelectMenuComponent). Should selfbot deprecate MessageSelectMenu entirely?

5. **Modal Component Support**: Should modals use the new ActionRow + components pattern or keep Modal.js separate?

6. **Testing**: Are there existing tests for flags and components that need updating?

