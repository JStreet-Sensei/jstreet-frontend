import NextAuth, { Account, Profile } from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticatedUser } from "../../../globals/types/next";
import axios from "axios";

let googleClientId = process.env.GOOGLE_CLIENT_ID;
let googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientId === undefined) googleClientId = "";
if (googleClientSecret === undefined) googleClientSecret = "";

export const settings: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("I am inside calling the callback");
      if (account?.provider === "google") {
        const { accessToken, idToken } = account;

        // POST request to DRF
        try {
          console.log("I am calling the callback");
          const response = await axios.post(
            "http://localhost:8000/api/google/",
            {
              access_token: accessToken,
              id_token: idToken,
            },
          );

          const { access_token } = response.data;
          return true;
        } catch (error) {
          console.log("Error: ", error);
          return false;
        }
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, settings);
