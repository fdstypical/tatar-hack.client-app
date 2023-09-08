import { SessionOptions } from "next-auth"

export const session: Partial<SessionOptions> = {
  strategy: "jwt",
}
