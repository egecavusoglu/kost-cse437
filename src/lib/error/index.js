import { serializeError } from 'serialize-error';
/**
 * Stringifies error
 * @param {*} err JS Error object
 * @returns
 */
function stringifyError(err) {
  return serializeError(err);
}

export { stringifyError };
