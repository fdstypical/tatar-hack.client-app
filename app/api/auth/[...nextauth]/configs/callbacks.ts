import { CallbacksOptions } from "next-auth"
import { parseJwt, refresh } from "../../utils"

export const callbacks: Partial<CallbacksOptions> = {
  async jwt({ token, user }) {
    const payload = parseJwt((token as any)?.accessToken)

    if (!payload || Date.now() < payload.exp * 1000)
      return { ...token, ...user, exp: payload?.exp }

    return {
      ...(await refresh(
        (token as any)?.accessToken,
        (token as any)?.refreshToken
      )),
      user,
    }
  },
  async session({ session, token }) {
    return { ...session, user: token }
  },
}
