# Phase 1: API v9 → v10 Migration

## Priority: HIGH | Status: TODO

## Overview
Update Discord API version from v9 to v10 across all source files.

## Key Changes (v9 → v10)
- Base URL: `https://discord.com/api/v10`
- Gateway version: 10
- Breaking endpoint changes (see Discord docs)

## Files to Modify

### Core Config (2 files)
- [ ] `src/util/Options.js` — Change `version: 9` → `version: 10` (lines 220, 228)
- [ ] `src/util/Constants.js` — Update any v9-specific constants

### REST Layer (1 file)
- [ ] `src/rest/APIRequest.js` — Verify API URL construction (line 49-52, already dynamic)

### WebSocket (2 files)
- [ ] `src/WebSocket.js` — Update gateway version
- [ ] `src/client/websocket/WebSocketManager.js` — Update gateway URL version

### Comments/Docs (~15 files)
- [ ] Update hardcoded `api/v9` references in comments across structures/managers

## Implementation Steps
1. Update `Options.js` version constants (ws.version, http.version) from 9 → 10
2. Update WebSocket gateway version
3. Find/replace `api/v9` → `api/v10` in comments
4. Test connection with API v10

## Risk Assessment
- LOW: Version number is mostly config-driven (Options.js)
- MEDIUM: Some v10 endpoints may have different request/response shapes
- Selfbot REST layer constructs URLs dynamically from options, so version change propagates automatically

## Success Criteria
- [ ] All API requests use v10
- [ ] WebSocket connects with gateway v10
- [ ] No hardcoded v9 references remain
