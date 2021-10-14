import { postRequest } from 'src/lib/fetch';

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

export { createOrganisation };
