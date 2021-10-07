/**
 * This wrapper runs an async function and resolved its value not before the timeout.
 * For example fn takes 300ms to complete, and timeout is 1000ms waitForAtLeast will ensure that the promise does not return fn's result before 1000ms.
 * If fn takes 1200ms to complete, but timeout is 1000ms the waitForAtLeast will resolve the value at 1200ms.
 * @param {*} fn async function you want to run.
 * @param {*} timeout lower bound of the number of miliseconds to wait before the fn resolves.
 * @returns
 */

const waitForAtLeast = async (fn, timeout) => {
  const topPromise = new Promise((resolve, reject) => {
    let fnResolved = false;
    let fnResult = null;
    let timerResolved = false;

    setTimeout(() => {
      timerResolved = true;
      if (fnResolved) {
        console.log('TIMER RESOLVED');
        resolve(fnResult);
      }
    }, timeout);

    fn()
      .then((val) => {
        fnResolved = true;
        fnResult = val;
        if (timerResolved) {
          console.log('FN RESOLVED');
          resolve(val);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

  return topPromise;
};

export { waitForAtLeast };
