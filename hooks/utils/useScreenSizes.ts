import { useCallback, useEffect, useState } from "react"
import { Nullable } from "@/types/common"
import { useIsBrowser } from "@/hooks"

export interface IUseScreenSizes {
  width: Nullable<number>
  height: Nullable<number>
}

export const useScreenSizes = (): IUseScreenSizes => {
  const isBrowser = useIsBrowser()

  const [sizes, setSizes] = useState<IUseScreenSizes>({
    width: null,
    height: null,
  })

  const handleResize = useCallback(
    () =>
      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    [setSizes]
  )

  useEffect(() => {
    if (!isBrowser) return

    window.addEventListener("resize", handleResize)
    handleResize()

    return () =>
      window.removeEventListener("resize", handleResize)
  }, [isBrowser, handleResize])

  return sizes
}
