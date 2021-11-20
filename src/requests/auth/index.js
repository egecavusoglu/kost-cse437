import { postRequest, putRequest } from 'src/lib/fetch';
import { getProfile, resetProfile } from '../profile';
import Router from 'next/router';

async function signup({ firstName, lastName, email, password }) {
  try {
    const response = await postRequest({
      url: '/api/signup',
      body: { firstName: firstName, lastName: lastName, email: email, password: password },
    });
    if (response.isSuccess) {
      return true;
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
      url: '/api/login',
      body: { email: email, password: pwd },
    });
    if (response.isSuccess) {
      await getProfile();
      return response;
    }
    throw response.error;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function logout() {
  try {
    const response = await postRequest({
      url: '/api/logout',
    });
    if (response.isSuccess) {
      resetProfile();
      Router.push('/welcome');
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

const PASSWORD_API_URI = '/api/profile/password';

async function resetPassword({ newPassword, oldPassword }) {
  try {
    const res = await putRequest({
      url: PASSWORD_API_URI,
      body: {
        newPassword,
        oldPassword,
      },
    });

    if (res?.isSuccess) {
      return res;
    }
    return res;
  } catch (err) {
    return err;
  }
}

export { login, signup, logout, resetPassword };
