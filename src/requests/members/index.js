import { useQuery, postRequest, putRequest, deleteRequest } from 'src/lib/fetch';

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

/**
 * Change member status of a user. Make them an admin or not admin.
 * @param {int} orgId organisation id
 * @param {int} userId id of the user you want to change
 * @param {object} {isAdmin: Boolean} New state you want changed to.
 * @returns
 */
async function changeMemberStatus(orgId, userId, { isAdmin }) {
  try {
    const res = await putRequest({
      url: `/api/orgs/${orgId}/members/${userId}`,
      body: {
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

async function removeMemberFromOrg(orgId, userId) {
  try {
    const res = await deleteRequest({
      url: `/api/orgs/${orgId}/members/${userId}`,
    });
    if (res.isSuccess) {
      return res.data;
    }
    throw res.error;
  } catch (err) {
    return false;
  }
}

export { MEMBERS_API_URI, useOrgMembers, addMemberToOrg, changeMemberStatus, removeMemberFromOrg };
