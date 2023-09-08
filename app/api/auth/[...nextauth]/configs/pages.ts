import { Pages } from "@/constants/routing";
import { PagesOptions } from "next-auth";

export const pages: Partial<PagesOptions> = {
  signIn: Pages.SignIn,
  error: Pages.SignIn,
  newUser: Pages.SignUp,
};
