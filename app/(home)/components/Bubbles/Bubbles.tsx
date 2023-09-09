"use client"

import { useEffect, useState } from "react"
import { randInt } from "@/utils/number"
import { useIsMounted } from "@/hooks"

export interface BubblesProps {}

export interface IBubble {
  id: number
  x: number
  y: number
  delta: -1 | 1
  width: number
  color: string
}

const sizes = [100, 80, 60]
const colors = [
  "rgba(245, 113, 112, 1)",
  "rgba(4, 148, 68, 1)",
  "rgba(107, 197, 80, 1)",
]

const generateDataset = (
  x: number = 3,
  y: number = 7
): IBubble[][] => {
  const dataset: (IBubble | null)[][] = Array.from(
    new Array(y),
    (_, i) =>
      Array.from(new Array(i % 2 == 0 ? x : x - 1), () => null)
  )

  for (let i = 0; i < dataset.length; i++) {
    for (let j = 0; j < dataset[i].length; j++) {
      const color = colors[randInt(0, 2)]
      const width = sizes[randInt(0, 2)]

      dataset[i][j] = {
        id: randInt(0, 10000),
        x: randInt(10, 50),
        y: randInt(10, 50),
        width,
        color,
        delta: randInt(0, 1) % 2 == 0 ? -1 : 1,
      }
    }
  }

  return dataset as IBubble[][]
}

export const Bubbles: React.FC<BubblesProps> = ({}) => {
  const isMounted = useIsMounted()
  const [dataset, setDataset] = useState<IBubble[][]>([])

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
      setDataset(generateDataset())
      timerId = setInterval(updateBubbles, 1500)
    }

    return () => clearInterval(timerId)
  }, [isMounted])

  return (
    <div className="pt-6 h-full w-full flex flex-col gap-4 overflow-hidden">
      {dataset.map((row, idx) => (
        <div key={idx} className="w-full h-full flex gap-4">
          {row.map((item) => (
            <div
              key={item.id}
              className="flex basis-full relative"
            >
              <div
                onClick={() => console.log(item.id, item.color)}
                className="absolute transition-all duration-[2000ms] rounded-full flex justify-center items-center"
                style={{
                  width: `${item.width}px`,
                  height: `${item.width}px`,
                  top: `${item.y}%`,
                  left: `${item.x}%`,
                  background: item.color,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
