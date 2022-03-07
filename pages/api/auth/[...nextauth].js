import prisma from "../../../lib/prisma.ts"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const bcrypt = require("bcrypt");

export default NextAuth({
  providers: [
    CredentialsProvider({
      id:'credentials',
      name: "trollo",
      credentials: {
        username: {type:"text"},
        password: {type:"password"},
      },
      authorize: async (credentials, req) => {
        const userraw = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
        });

        const result = bcrypt.compareSync(
          credentials.password,
          userraw.password
        );

        if (userraw !== null && result) {
          const user = {
            id: userraw.id,
            username: userraw.username,
            isActive: userraw.isActive,
            role: userraw.role,
          };

          return user;
        } else {
          return null;
        }

      },
      


    })
    
  ],
  secret: "asddwqewqeas",
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.token,
          refreshToken: user.data.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
        
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
})

