import { getUserProfile, sendLoginRequest } from "@/services/auth/auth";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }
        // try {
        const data = {
          identifier: credentials.email,
          password: credentials.password,
        };
        const res = await sendLoginRequest(data);
        if (res.status !== 200) {
          throw new Error(res?.response?.data?.error?.message);
        }
        const jwt = await res?.data.jwt;
        const resDataUser = await getUserProfile(jwt);
        if (resDataUser?.status !== 200) {
          throw new Error(resDataUser?.response?.data?.error?.message);
        }
        const { Fonction, Filtre_actif, compte_actif } =
          resDataUser?.data?.Autorisation;
        return {
          user: res.data.user,
          apiToken: res?.data.jwt,
          role: Fonction,
          actif: compte_actif,
          id: res.data.user.id,
          filtre: Filtre_actif,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/connexion", // Le chemin vers votre page de connexion personnalisée
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.id = user.id; // @ts-ignore
        token.jwt = user.apiToken; // @ts-ignore
        token.email = user.user.email; // @ts-ignore
        token.role = user.role; // @ts-ignore
        token.actif = user.actif; // @ts-ignore
        token.filtre = user.filtre;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (session?.user) {
        // @ts-ignore
        session.user.jwt = token.jwt; // @ts-ignore
        session.user.id = token.id; // @ts-ignore
        session.user.email = token.email; // @ts-ignore
        session.user.role = token.role; // @ts-ignore
        session.user.actif = token.actif; // @ts-ignore
        session.user.filtre = token.filtre;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
};
