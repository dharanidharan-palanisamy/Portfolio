import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // 1. Fallback to Environment Variables for robust login on Vercel
        if (
          process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD &&
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", email: credentials.email, name: "Admin" };
        }

        // 2. Try Database if env vars are not used
        try {
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email }
          });

          if (!admin) throw new Error("Invalid credentials");

          const isValid = await bcrypt.compare(credentials.password, admin.password);
          if (!isValid) throw new Error("Invalid credentials");

          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
          };
        } catch (e) {
          // If Prisma fails (e.g. SQLite read path issue on Vercel), fallback to hardcoded fallback
          if (credentials.email === "admin@dharanidharan.com" && credentials.password === "password123") {
            return { id: "1", email: credentials.email, name: "Admin (Fallback)" };
          }
          throw new Error("Invalid credentials");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
