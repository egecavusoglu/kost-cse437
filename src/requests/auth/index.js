import { postRequest } from 'src/lib/fetch';

async function signup({ firstName, lastName, email, password }) {
  try {
    const response = await postRequest({
      url: 'api/signup',
      body: { firstName: firstName, lastName: lastName, email: email, password: password },
    });
    if (response.isSuccess) {
      return response;
    }
    throw response.error;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function login(email, pwd) {
  try {
    const response = await postRequest({
      url: 'api/login',
      body: { email: email, password: pwd },
    });
    if (response.isSuccess) {
      return response;
    }
    throw response.error;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export { login, signup };
