import { getPermissionScore } from 'src/lib/permissions';
function sortMembers(members) {
  return members?.sort(
    (a, b) =>
      0 -
      getPermissionScore({ isAdmin: a.isAdmin, owner: a.isOwner }) +
      getPermissionScore({ isAdmin: b.isAdmin, owner: b.isOwner })
  );
}

export { sortMembers };
