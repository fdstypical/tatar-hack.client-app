import { CallbacksOptions } from "next-auth"

export const callbacks: Partial<CallbacksOptions> = {
  async jwt({ token, user }) {
    console.log(token)
    return { ...token, ...user }
  },
  async session({ session, token }) {
    return { ...session, user: token }
  },
}
