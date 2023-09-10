import React from "react"
import { Menu } from "./components/Menu"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-full pb-[60px] bg-gradient-to-b from-[rgba(238,245,240,1)] to-[rgba(217,240,209,1)]">
      <div className="h-full overflow-y-auto">{children}</div>

      <div className="w-full">
        <Menu />
      </div>
    </main>
  )
}
