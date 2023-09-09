import type { Metadata } from "next"
import cx from "classnames"
import { Inter } from "next/font/google"
import { NextAuthProvider } from "@/providers/NextAuthProvider"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Смайлстрит",
  description: "Ходи и смотри",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const classNames = cx(inter.className, "h-screen")

  return (
    <html lang="en">
      <body className={classNames}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
