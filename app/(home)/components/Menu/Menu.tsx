import {
  IconMap,
  IconProfile,
  IconRoad,
} from "@/components/icons"
import Link from "next/link"

export interface MenuProps {}

export const Menu: React.FC<MenuProps> = () => {
  return (
    <div className="px-20 pt-3 pb-4 flex justify-between items-center bg-[#049444]">
      <Link href="/">
        <IconRoad className="text-white" />
      </Link>

      <Link href="/">
        <IconMap className="text-white" />
      </Link>

      <Link href="/">
        <IconProfile className="text-white" />
      </Link>
    </div>
  )
}
