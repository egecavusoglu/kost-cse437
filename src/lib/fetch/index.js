import fetchIntercept from 'fetch-intercept';
import useSWR from 'swr';
import Router from 'next/router';
import { toast } from 'src/lib/toast-outside';

const unregister = fetchIntercept.register({
  request: function (url, config) {
    // Modify the url or config here
    return [url, config];
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: function (response) {
    // Modify the response object
    if (response?.redirected) {
      // If server included a redirect change app location
      toast({
        title: 'Oops, you are redirected.',
        description: "You don't have access to that page.",
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      Router.push(response?.url);
    }
    return response;
  },

  responseError: function (error) {
    // Handle an fetch error
    return Promise.reject(error);
  },
});

const SHARED_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function getRequest({ url, headers }) {
  return fetch(url, {
    headers: { headers, ...SHARED_HEADERS },
    method: 'GET',
  })
    .then((r) => r.json())
    .catch((err) => err);
}

function postRequest({ url, body = {}, headers }) {
  return fetch(url, {
    headers: { headers, ...SHARED_HEADERS },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((r) => r.json())
    .catch((err) => err);
}

function putRequest({ url, body = {}, headers }) {
  return fetch(url, {
    headers: { headers, ...SHARED_HEADERS },
    method: 'PUT',
    body: JSON.stringify(body),
  })
    .then((r) => r.json())
    .catch((err) => err);
}

function deleteRequest({ url, body = {}, headers }) {
  return fetch(url, {
    headers: { headers, ...SHARED_HEADERS },
    method: 'DELETE',
    body: JSON.stringify(body),
  })
    .then((r) => r.json())
    .catch((err) => err);
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useQuery(url) {
  return useSWR(url, fetcher);
}

export { getRequest, postRequest, putRequest, deleteRequest, useQuery };
