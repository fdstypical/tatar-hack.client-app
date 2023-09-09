"use client"

import { useFetch } from "@/hooks/fetch/useFetch"
import { fetcher } from "@/libs/apis/fetcher"

export default function Home() {
  const { data, error, isLoading } = useFetch((headers) =>
    fetcher.get("/user/get", headers)
  )

  console.log(data, error?.message, isLoading)

  return <div>Test</div>
}
