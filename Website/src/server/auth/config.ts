import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/server/db";
import { env } from "@/env";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      // ...other properties
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db),
  secret: env.AUTH_SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      const userFromDB = await db.entity.findUnique({
        where: { email: user.email },
      });
      return {
        ...session,
        user: {
          ...session.user,
          id: userFromDB?.id,
          role: userFromDB?.role,
        },
      };
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!!profile?.email?.endsWith("@sicsr.ac.in")) {
          const userFromDB = await db.entity.findUnique({
            where: { email: profile.email },
            select: { id: true },
          });

          if (!userFromDB) {
            return false;
          }

          return true;
        }
      }
      return false;
    },
  },
} satisfies NextAuthConfig;
