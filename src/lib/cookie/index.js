import { serialize } from 'cookie';

/**
 * sets the cookie to an outgoing response
 * @param {*} res response object
 * @param {*} name name of the cookie
 * @param {*} value value of the cookie
 * @param {*} options options of the cookie
 */
function setCookie(res, name, value, options) {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
}

const AUTH_COOKIE_KEY = 'auth-token';
const TOKEN_PREFIX = 'Bearer';

/**
 * sets http only auth-token cookie in the outgoing response
 * @param {*} res response object
 * @param {*} token jwt token to be set as auth-token cookie
 */
function setAuthCookie(res, token) {
  setCookie(res, AUTH_COOKIE_KEY, `${TOKEN_PREFIX} ${token}`, {
    httpOnly: true,
    path: '/',
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

/**
 * Resets http only auth-token cookie in the outgoing response
 * @param {*} res response object
 */
function resetAuthCookie(res) {
  setCookie(res, AUTH_COOKIE_KEY, ``, {
    httpOnly: true,
    path: '/',
    sameSite: 'Strict',
    secure: false,
  });
}

/**
 * extract the auth cookie from the incoming request cookies.
 * @param {*} req
 * @returns
 */
function getAuthCookie(req) {
  const token = req.cookies[AUTH_COOKIE_KEY];
  return token;
}

export { setCookie, setAuthCookie, resetAuthCookie, getAuthCookie };
