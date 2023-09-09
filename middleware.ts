import { withAuth } from "next-auth/middleware"
import { pages } from "@/app/api/auth/[...nextauth]/configs"

export default withAuth({
  pages,
  callbacks: {
    authorized: ({ token }) => {
      if (token) return true
      return false
    },
  },
})
