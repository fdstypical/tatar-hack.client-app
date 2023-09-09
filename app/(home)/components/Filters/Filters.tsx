"use client"

import { BaseButton } from "@/components/ui"
import { Nullable } from "@/types/common"
import cx from "classnames"

export interface FilterProps {
  active: Nullable<number>
  setActive: (number: Nullable<number>) => void
  categories: number[]
}

const Categories = {
  0: { title: "памятник" },
  1: { title: "природа" },
  2: { title: "улица" },
  3: { title: "архитектура" },
  4: { title: "религия" },
  5: { title: "музей" },
  6: { title: "история" },
}

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

export const Filters: React.FC<FilterProps> = ({
  active,
  setActive,
  categories,
}) => {
  const list = categories.map((idx: number) => ({
    id: idx,
    title: (Categories as any)[idx]?.title || "постройка",
    color:
      idx % 3 == 1
        ? Color.pink
        : idx % 3 == 2
        ? Color.lightgreen
        : Color.green,
  }))

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
