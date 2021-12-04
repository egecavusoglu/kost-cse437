import { prisma } from 'src/lib/prisma';
import { stringifyError } from 'src/lib/error';
import { hashPassword } from 'src/lib/password';
export default async function handler(req, res) {
  try {
    if (req.method == 'POST') {
      const user = await saveNewUser(req.body);
      return res.status(200).json({ isSuccess: true, data: user });
    }
  } catch (err) {
    res.status(400).json({ isSuccess: false, error: stringifyError(err) });
  }
}

async function saveNewUser(body) {
  const { firstName, lastName, email, password } = body;
  const hashedPass = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      hashedPassword: hashedPass,
    },
  });
  return user;
}
