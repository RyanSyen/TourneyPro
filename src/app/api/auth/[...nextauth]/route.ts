import { FirestoreAdapter } from "@auth/firebase-adapter";
import { Account, Profile, Session } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { JWT, JWTOptions } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import Facebook from "next-auth/providers/facebook";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

import { firestore } from "@/lib/firebase/firestore";

interface jwtProps {
  token: JWT;
  account: Account | null;
  profile?: Profile;
}

export const authOptions = {
  adapter: FirestoreAdapter() as Adapter,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    // signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, profile }: jwtProps) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token;
      //   token.id = profile.id;
      // }
      console.log("callback jwt [token]: ", token);
      console.log("callback jwt [account]: ", account);
      console.log("callback jwt [profile]: ", profile);
      return token;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
