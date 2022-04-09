import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { createUser, findByEmail, verifyPassword } from '../../../models/user';


const prisma = new PrismaClient();


export default NextAuth({
 

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      

      credentials: {
        username: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        
      },


      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await findByEmail(credentials?.username)
        //fecth mes données DB - find dans la db un user créé depuis seed... (equivalent reset db)

        if (user &&
          user.hashedPassword &&
          (await verifyPassword(credentials?.password, user.hashedPassword))) {
          // Any object returned will be saved in `user` property of the JWT

          return user;

        } else {
          
          // If you return null then an error will be displayed advising the user to check their details.
          
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
  //   // info custom jwt... a  voir si util en fonction de l'avancé...
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl;
  //   },
  //   async session({ session, user, token }) {
  //     return session;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token;
  //   },
  async session({ session, user, token } : any) {
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
    signIn: '/login',
  },
  // signer les JWT
  
});
