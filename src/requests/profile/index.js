const { getRequest } = require('src/lib/fetch');

async function getProfile() {
  try {
    const response = await getRequest({ url: 'api/profile' });
    if (response.isSuccess) {
      return response.data;
    }
    throw response.error;
  } catch (err) {
    return false;
  }
}

export { getProfile };
