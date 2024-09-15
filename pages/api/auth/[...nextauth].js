// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
// import { pages } from 'next/dist/build/templates/app-page';
// import { signIn } from 'next-auth/react';

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/';

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS = {
  credentials: async (user, account, profile, email, credentials) => {
    return true;
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authOptions = {
  pages: {
    signIn: '/',
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials, req) {
        try {
          const response = await axios({
            url: BACKEND_URL + 'api/auth/login/',
            method: 'post',
            data: credentials,
          });
          const data = response.data;
          if (data) return data;
        } catch (error) {
          console.log('An error during login, can be wrong credential');
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](user, account, profile, email, credentials);
    },
    async jwt({ user, token, account }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        let backendResponse = account.provider === 'credentials' ? user : account.meta;
        token['user'] = backendResponse.user;
        token['access_token'] = backendResponse.access;
        token['refresh_token'] = backendResponse.refresh;
        token['ref'] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }
      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > token['ref']) {
        const response = await axios({
          method: 'post',
          url: BACKEND_URL + 'api/auth/token/refresh/',
          data: {
            refresh: token['refresh_token'],
          },
        });
        token['access_token'] = response.data.access;
        token['refresh_token'] = response.data.refresh;
        token['ref'] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    async session({ token }) {
      return token;
    },
  },
};

export default NextAuth(authOptions);
