'use strict';

const Base = require('./Base');
const { MembershipStates } = require('../util/Constants');
// Note: v14 removed the `permissions` field from TeamMember in favor of `role`

/**
 * Represents a Client OAuth2 Application Team Member.
 * @extends {Base}
 */
class TeamMember extends Base {
  constructor(team, data) {
    super(team.client);

    /**
     * The Team this member is part of
     * @type {Team}
     */
    this.team = team;

    this._patch(data);
  }

  _patch(data) {
    if ('membership_state' in data) {
      /**
       * The membership state of this Team Member
       * @type {MembershipState}
       */
      this.membershipState = MembershipStates[data.membership_state];
    }

    if ('user' in data) {
      /**
       * The user for this Team Member
       * @type {User}
       */
      this.user = this.client.users._add(data.user);
    }

    if ('role' in data) {
      /**
       * The role of this Team Member
       * @type {TeamMemberRole}
       */
      this.role = data.role;
    }
  }

  /**
   * The Team Member's id
   * @type {Snowflake}
   * @readonly
   */
  get id() {
    return this.user.id;
  }

  /**
   * When concatenated with a string, this automatically returns the team member's mention instead of the
   * TeamMember object.
   * @returns {string}
   * @example
   * // Logs: Team Member's mention: <@123456789012345678>
   * console.log(`Team Member's mention: ${teamMember}`);
   */
  toString() {
    return this.user.toString();
  }
}

module.exports = TeamMember;
