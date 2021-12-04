import { getRequest, putRequest, useQuery } from 'src/lib/fetch';
import { useAuthStore } from 'src/store';

const PROFILE_API_URI = '/api/profile';

/**
 * Fetches user info from server and sets global user state accordingly.
 * @returns
 */
async function getProfile() {
  try {
    const response = await getRequest({ url: PROFILE_API_URI });
    if (response.isSuccess) {
      // set user profile to global state.
      useAuthStore.setState({
        isLoggedIn: true,
        user: response.data.user,
      });
      return response.data;
    }
    throw response.error;
  } catch (err) {
    useAuthStore.setState({
      isLoggedIn: false,
      user: null,
    });
    return false;
  }
}

/**
 * Resets the global state of user.
 */
function resetProfile() {
  useAuthStore.setState({
    isLoggedIn: false,
    user: null,
  });
}

function useProfile() {
  const { data, error } = useQuery(PROFILE_API_URI);
  if (data) {
    useAuthStore.setState({
      isLoggedIn: true,
      user: data?.data.user,
    });
  }
  return {
    profile: data?.data,
    loading: !error && !data,
    error,
  };
}

async function updateProfile({ firstName, lastName, email }) {
  try {
    const res = await putRequest({
      url: PROFILE_API_URI,
      body: {
        firstName,
        lastName,
        email,
      },
    });
    if (res?.isSuccess) {
      return res.data;
    }
    throw res.error;
  } catch (err) {
    return false;
  }
}

export { PROFILE_API_URI, getProfile, resetProfile, useProfile, updateProfile };
