"use client"

import { BaseButton } from "@/components/ui"
import { Nullable } from "@/types/common"
import cx from "classnames"
import { useState } from "react"

export interface FilterProps {}

enum Color {
  lightgreen,
  green,
  pink,
}

const getClassName = (color: Color) =>
  cx("px-5 py-1 rounded-full font-semibold border-2", {
    "text-[#6BC550] border-[#6BC550]":
      color === Color.lightgreen,
    "text-[#049444] border-[#049444]": color === Color.green,
    "text-[#F57170] border-[#F57170]": color === Color.pink,
  })

const getActiveClassName = (color: Color) =>
  cx("text-white", {
    "bg-[#6BC550]": color === Color.lightgreen,
    "bg-[#049444]": color === Color.green,
    "bg-[#F57170]": color === Color.pink,
  })

const list = [
  { color: Color.lightgreen, title: "памятники", id: 1 },
  { color: Color.green, title: "рестораны", id: 2 },
  { color: Color.pink, title: "музеи", id: 3 },
  { color: Color.lightgreen, title: "туц туц туц", id: 4 },
  { color: Color.pink, title: "test test", id: 5 },
  { color: Color.green, title: "hello world", id: 6 },
]

export const Filters: React.FC<FilterProps> = () => {
  const [active, setActive] = useState<Nullable<number>>(null)

  return (
    <div className="w-full pb-5 flex gap-3 overflow-y-auto">
      {list.map(({ id, title, color }) => (
        <BaseButton
          key={id}
          className={cx(getClassName(color), {
            [getActiveClassName(color)]: active === id,
          })}
          onClick={() =>
            id === active ? setActive(null) : setActive(id)
          }
        >
          {title}
        </BaseButton>
      ))}
    </div>
  )
}
