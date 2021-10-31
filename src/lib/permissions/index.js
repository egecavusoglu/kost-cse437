/**
 * Using numerical values for easier comparison of permission levels
 */
const PERMISSION_LEVELS = {
  OWNER: 2,
  ADMIN: 1,
  NONE: 0,
};

function getPermissionScore({ isAdmin = false, isOwner = false }) {
  if (isOwner) return PERMISSION_LEVELS.OWNER;
  if (isAdmin) return PERMISSION_LEVELS.ADMIN;
  return PERMISSION_LEVELS.NONE;
}

function canAddMembersToOrg(score) {
  return score > 0;
}
/**
 * Determines if editor has privileges to edit editee's member status
 */
function canEditMemberStatus({ editor = 0, editee = 0 }) {
  return editor > editee;
}

export { PERMISSION_LEVELS, getPermissionScore, canEditMemberStatus, canAddMembersToOrg };
