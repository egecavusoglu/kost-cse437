import bcrypt from 'bcrypt';

async function checkPassword(pwd, hashedPwd) {
  if (!pwd || !hashedPwd) {
    return false;
  }
  return await bcrypt.compare(pwd, hashedPwd);
}

async function hashPassword(pwd) {
  return await bcrypt.hash(pwd, 10);
}

export { checkPassword, hashPassword };
