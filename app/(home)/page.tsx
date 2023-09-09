"use client"

import { useFetch } from "@/hooks/fetch/useFetch"
import { fetcher } from "@/libs/apis/fetcher"
import { Bubbles } from "./components/Bubbles/Bubbles"
import { Filters } from "./components/Filters"

export default function Home() {
  const { data, error, isLoading } = useFetch((headers) =>
    fetcher.get("/user/get", headers)
  )

  return (
    <div className="w-full h-full flex flex-col">
      <div className="py-4 px-2">
        <Filters />
      </div>

      <div className="w-full h-full">
        <Bubbles />
      </div>
    </div>
  )
}
