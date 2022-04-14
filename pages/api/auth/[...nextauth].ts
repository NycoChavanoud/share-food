import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { createUser, findByEmail, verifyPassword } from "../../../models/user";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const user = await findByEmail(credentials?.username);

        if (
          user &&
          user.hashedPassword &&
          (await verifyPassword(credentials?.password, user.hashedPassword))
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }: any) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  secret: process.env.SECRET,

  pages: {
    signIn: "/login",
  },
});
