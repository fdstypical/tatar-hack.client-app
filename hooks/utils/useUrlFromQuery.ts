import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

export const useUrlFromQuery = (
  name: string,
  fallback: string
): string => {
  const query = useSearchParams()

  const url = useMemo(() => {
    const value = query.get(name)
    const rawUrl = typeof value === "string" ? value : null

    let url

    try {
      url = rawUrl ? new URL(rawUrl).pathname : fallback
    } catch (_: unknown) {
      url = fallback
    }

    return url
  }, [query])

  return url
}
