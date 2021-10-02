import { prisma } from 'src/lib/prisma';

export default async function handler(req, res) {
  try {
    if (req.method == 'POST') {
      console.log(req.body);
      const { firstName, lastName, email, password } = req.body;
      const user = await prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          hashedPassword: password,
        },
      });
      return res.status(200).json({ isSuccess: true, data: user });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ isSuccess: false, error: err });
  }
}
