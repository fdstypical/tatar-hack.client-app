import CredentialsProvider from "next-auth/providers/credentials"
import { login } from "@/app/api/auth/utils/tokens"

export const credentialsProvider = CredentialsProvider({
  name: "credentials",
  credentials: {
    email: {
      label: "Email",
      type: "email",
      placeholder: "example@gmail.com",
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Password",
    },
  },
  authorize: async (credentials) => {
    try {
      if (!credentials) throw new Error("Bad credentials")
      const token = login(credentials)
      return token
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },
})
