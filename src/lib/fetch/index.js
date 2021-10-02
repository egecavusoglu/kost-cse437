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

function postRequest({ url, body, headers }) {
  return fetch(url, {
    headers: { headers, ...SHARED_HEADERS },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((r) => r.json())
    .catch((err) => err);
}

export { getRequest, postRequest };
