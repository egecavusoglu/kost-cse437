import { getPermissionScore } from 'src/lib/permissions';
function sortMembers(members) {
  const sorted = members?.sort((a, b) => {
    const aScore = getPermissionScore({ isAdmin: a.isAdmin, isOwner: a.isOwner });
    const bScore = getPermissionScore({ isAdmin: b.isAdmin, isOwner: b.isOwner });
    return bScore - aScore;
  });
  return sorted;
}

export { sortMembers };
