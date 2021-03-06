import { getRequest, useQuery, postRequest, deleteRequest } from 'src/lib/fetch';

async function createOrganisation({ name, description, plan }) {
  try {
    const res = await postRequest({
      url: '/api/orgs',
      body: {
        name,
        description,
        plan,
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
 * @returns the orgs current user is a member of.
 */
async function getOrganisations() {
  try {
    const res = await getRequest({
      url: '/api/orgs',
    });

    if (res.isSuccess) {
      return res.data;
    }
    throw res.error;
  } catch (err) {
    return false;
  }
}

function useOrgs() {
  const { data, error } = useQuery('/api/orgs');
  return {
    orgs: data?.data,
    loading: !error && !data,
    error,
  };
}

function useOrgDetails(orgId) {
  const { data, error } = useQuery(`/api/orgs/${orgId}`);
  return {
    org: data?.data,
    loading: !error && !data,
    error,
  };
}

async function deleteOrganisation(orgId) {
  try {
    const res = await deleteRequest({
      url: `/api/orgs/${orgId}`,
    });

    if (res.isSuccess) {
      return true;
    }
    throw res.error;
  } catch (err) {
    return false;
  }
}

function useDashboard(orgId) {
  const { data, error } = useQuery(`/api/orgs/${orgId}/dashboard`);
  return {
    dashboard: data,
    dashboard_loading: !error && !data,
    dashboard_error: error,
  };
}

export { createOrganisation, getOrganisations, useOrgs, useOrgDetails, deleteOrganisation, useDashboard };
