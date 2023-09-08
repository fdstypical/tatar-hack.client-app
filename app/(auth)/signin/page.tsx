import { Metadata } from "next"
import { SignInForm } from "./components/SignInForm"

export const metadata: Metadata = {
  title: "Sign In",
}

export default async function SignIn() {
  return (
    <div className="flex w-full justify-end">
      <div className="w-full min-w-[45%] sm:w-[25rem]">
        <SignInForm />
      </div>
    </div>
  )
}
