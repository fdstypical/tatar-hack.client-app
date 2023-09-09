import { withAuth } from "next-auth/middleware"
import { pages } from "@/app/api/auth/[...nextauth]/configs"
import { Pages } from "@/constants/routing"

export default withAuth({
  pages,
  callbacks: {
    authorized: ({ req: { nextUrl }, token }) => {
      const { pathname } = nextUrl

      if (
        token ||
        pathname.includes(Pages.SignUp) ||
        pathname.includes(Pages.SignIn) ||
        pathname.includes(Pages.Choice)
      )
        return true

      return false
    },
  },
})
