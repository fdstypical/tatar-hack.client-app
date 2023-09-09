// import { Menu } from "./components/Menu"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-full pb-[60px] relative bg-gradient-to-b from-[rgba(238,245,240,1)] to-[rgba(217,240,209,1)]">
      {children}

      {/* <div className="sticky w-full bottom-0 left-0">
        <Menu />
      </div> */}
    </main>
  )
}
