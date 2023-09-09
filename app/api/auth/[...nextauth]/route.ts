import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import configsRegistry from "@/configs/configs.registry"
import { callbacks, pages, session } from "./configs"
import { credentialsProvider } from "./configs/providers"

const authOptions: AuthOptions = {
  pages,
  session,
  callbacks,
  providers: [credentialsProvider],
  secret: configsRegistry.get("NEXTAUTH_SECRET"),
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
