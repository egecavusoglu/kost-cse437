import { getRequest } from 'src/lib/fetch';
import { useAuthStore } from 'src/store';

/**
 * Fetches user info from server and sets global user state accordingly.
 * @returns
 */
async function getProfile() {
  try {
    const response = await getRequest({ url: '/api/profile' });
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

export { getProfile, resetProfile };
