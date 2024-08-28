import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyToken, signToken } from '@/lib/auth';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }
        return { id: user._id, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
