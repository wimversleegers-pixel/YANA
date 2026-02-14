import { PrismaAdapter } from '@auth/prisma-adapter';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  session: { strategy: 'database' },
  callbacks: {
    async session({ session, user }) {
      const roles = await prisma.userRole.findMany({ where: { userId: user.id } });
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          roles: roles.map((r) => r.role)
        }
      };
    }
  },
  pages: { signIn: '/login' }
};

export function auth() {
  return getServerSession(authOptions);
}
