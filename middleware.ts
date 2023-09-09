import {withAuth} from "next-auth/middleware"
import {pages} from "@/app/api/auth/[...nextauth]/configs"
import {Pages} from "@/constants/routing"

export default withAuth({
    pages,
    callbacks: {
        authorized: ({req: {nextUrl}, token}) => {
            const {pathname} = nextUrl

            console.log(token, pathname)
            if (token || pathname.includes(Pages.SignUp) || pathname.includes(Pages.SignIn)) return true
            return false
        },
    },
})
