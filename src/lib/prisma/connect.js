import prismaClient from './client';

/**
 * @function connectToPrisma
 * @returns connection to database
 * If a connection already exists, returns that right away for perf reasons.
 */
let connection = null;
async function connectToPrisma() {
  if (connection) {
    return connection;
  }
  connection = await prismaClient.$connect();
  return connection;
}

export default connectToPrisma;
