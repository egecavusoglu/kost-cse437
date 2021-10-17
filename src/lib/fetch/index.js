import useSWR from 'swr';
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

export { getRequest, postRequest, deleteRequest, useQuery };
