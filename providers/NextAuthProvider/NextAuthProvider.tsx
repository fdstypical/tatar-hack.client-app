"use client";

import { SessionProvider } from "next-auth/react";
import { WithChildren } from "@/types/common";

export interface NextAuthProviderProps extends WithChildren {}

export const NextAuthProvider: React.FC<NextAuthProviderProps> = ({
  children,
}) => <SessionProvider>{children}</SessionProvider>;
