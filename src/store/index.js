/**
 * @file This file is used to manage global state of the React application.
 * We are using Zustand as our global state management library. It is a very lightweight library compared to redux or context API.
 */

import create from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  logIn: (newUser) =>
    set((state) => {
      return { ...state, user: newUser, isLoggedIn: true };
    }),
  logOut: () =>
    set((state) => {
      return { ...state, user: null, isLoggedIn: false };
    }),
}));

export { useAuthStore };
