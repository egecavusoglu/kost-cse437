import { getRequest, postRequest } from 'src/lib/fetch';

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

export { createOrganisation, getOrganisations };
