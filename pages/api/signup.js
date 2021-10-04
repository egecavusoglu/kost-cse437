import { prisma } from 'src/lib/prisma';
import bcrypt from 'bcrypt';
export default async function handler(req, res) {
  try {
    if (req.method == 'POST') {
      const { firstName, lastName, email, password } = req.body;
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          hashedPassword: hashedPass,
        },
      });
      return res.status(200).json({ isSuccess: true, data: user });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ isSuccess: false, error: err });
  }
}
