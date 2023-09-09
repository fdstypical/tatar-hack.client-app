import React from "react"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-full pb-[60px] relative bg-gradient-to-b from-[rgba(238,245,240,1)] to-[rgba(217,240,209,1)]">
      {children}
    </main>
  )
}
