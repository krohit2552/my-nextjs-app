import { connectToDatabase } from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, role } = req.body;

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json(user);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
