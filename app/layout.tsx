import React from "react"
import type { Metadata } from "next"
import cx from "classnames"
import { montserratAlternates } from "@/utils/fonts"
import { NextAuthProvider } from "@/providers/NextAuthProvider"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Смайлстрит",
  description: "Ходи и смотри",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const classNames = cx(
    montserratAlternates.className,
    "h-screen"
  )

  return (
    <html lang="en">
      <body className={classNames}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
