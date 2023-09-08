import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access: string;
      refresh: string;
    };
  }

  interface User {
    token: string;
    refreshToken: string;
  }
}
