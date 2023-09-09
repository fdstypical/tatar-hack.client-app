"use client"

import { useEffect, useState } from "react"
import cx from "classnames"
import { randInt } from "@/utils/number"
import { useIsMounted } from "@/hooks"
import { IconSmile, IconSmileComplete } from "@/components/icons"
import { useRouter } from "next/navigation"

export interface BubblesProps {
  completed: Record<string, boolean>
  marks: any[]
}

export interface IBubble {
  id: number
  x: number
  y: number
  delta: -1 | 1
  width: number
  color: string
  completed: boolean
}

const sizes = [130, 110, 90]

const colors = [
  "rgba(245, 113, 112, 1)",
  "rgba(4, 148, 68, 1)",
  "rgba(107, 197, 80, 1)",
]

const generateDataset = (
  x: number = 3,
  y: number = 7,
  marks: any[],
  completed: any
): IBubble[][] => {
  const dataset: (IBubble | null)[][] = Array.from(
    new Array(y),
    (_, i) =>
      Array.from(new Array(i % 2 == 0 ? x : x - 1), () => null)
  )

  let idx = 0

  for (let i = 0; i < dataset.length; i++) {
    for (let j = 0; j < dataset[i].length; j++) {
      const color = colors[randInt(0, 2)]
      const width = sizes[randInt(0, 2)]

      dataset[i][j] = {
        id: marks?.[idx]?.id,
        x: randInt(10, 50),
        y: randInt(10, 50),
        width,
        color,
        delta: randInt(0, 1) % 2 == 0 ? -1 : 1,
        completed: completed?.[marks?.[idx]?.id],
      }

      idx++
    }
  }

  console.log(dataset)

  return dataset as IBubble[][]
}

export const Bubbles: React.FC<BubblesProps> = ({
  completed,
  marks,
}) => {
  const isMounted = useIsMounted()
  const [dataset, setDataset] = useState<IBubble[][]>([])

  const { push } = useRouter()

  const updateBubbles = () =>
    setDataset((dataset) =>
      dataset.map((row) =>
        row.map((item) => ({
          ...item,
          x: item.x + item.delta * randInt(1, 8),
          y: item.y + item.delta * randInt(1, 8),
          delta: (-1 * item.delta) as -1 | 1,
        }))
      )
    )

  useEffect(() => {
    let timerId: any

    if (isMounted) {
      setDataset(
        generateDataset(
          marks.length < 2 ? marks.length : 2,
          Math.ceil(marks.length / 2),
          marks,
          completed
        )
      )
      timerId = setInterval(updateBubbles, 1500)
    }

    return () => clearInterval(timerId)
  }, [isMounted])

  return (
    <div className="pt-6 h-full w-full flex flex-col gap-6 overflow-hidden">
      {dataset.map((row, idx) => (
        <div key={idx} className="w-full h-full flex gap-8">
          {row.map((item) => (
            <div
              key={item.id}
              className="flex basis-full relative"
            >
              <div
                onClick={() =>
                  !item.completed && push(`/${item.id}`)
                }
                className="absolute transition-all duration-[2000ms] rounded-full flex justify-center items-center"
                style={{
                  width: `${item.width}px`,
                  height: `${item.width}px`,
                  top: `${item.y}%`,
                  left: `${item.x}%`,
                  background: item.color,
                }}
              >
                {item.completed ? (
                  <IconSmileComplete
                    className={cx({
                      "text-white":
                        item.color === "rgba(245, 113, 112, 1)",
                      "text-[rgba(107,197,80,1)]":
                        item.color === "rgba(4, 148, 68, 1)",
                      "text-[rgba(4,148,68,1)]":
                        item.color === "rgba(107, 197, 80, 1)",
                    })}
                  />
                ) : (
                  <IconSmile
                    className={cx({
                      "text-white":
                        item.color === "rgba(245, 113, 112, 1)",
                      "text-[rgba(107,197,80,1)]":
                        item.color === "rgba(4, 148, 68, 1)",
                      "text-[rgba(4,148,68,1)]":
                        item.color === "rgba(107, 197, 80, 1)",
                    })}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
