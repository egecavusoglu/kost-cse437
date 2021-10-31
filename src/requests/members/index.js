import { useQuery, postRequest } from 'src/lib/fetch';

/**
 * API endpoint for the members related operations.
 * @param {number} orgId
 * @returns {string} dynamic api uri endpoint
 */

const MEMBERS_API_URI = (orgId) => `/api/orgs/${orgId}/members`;

function useOrgMembers(orgId) {
  const { data, error } = useQuery(MEMBERS_API_URI(orgId));
  return {
    members: data?.data,
    loading: !error && !data,
    error,
  };
}

async function addMemberToOrg(orgId, { email, isAdmin }) {
  try {
    const res = await postRequest({
      url: `/api/orgs/${orgId}/members`,
      body: {
        email,
        isAdmin,
      },
    });

    if (res.isSuccess) {
      return res.data;
    }
    throw res.error;
  } catch (err) {
    return false;
  }
}

export { MEMBERS_API_URI, useOrgMembers, addMemberToOrg };
