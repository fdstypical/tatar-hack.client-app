"use client"

import { useFetch } from "@/hooks/fetch/useFetch"
import { fetcher } from "@/libs/apis/fetcher"
import { Bubbles } from "./components/Bubbles/Bubbles"
import { Filters } from "./components/Filters"
import { Loader } from "@/components/ui"
import { useWatchPostion } from "@/hooks"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Nullable } from "@/types/common"

export default function Home() {
  const { data: session } = useSession()
  const { position } = useWatchPostion()
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [active, setActive] = useState<Nullable<number>>(null)

  const { data: completed } = useFetch((headers) =>
    fetcher.get("/mark/get-completed", headers)
  )

  const completedIds = ((completed || []) as any[]).reduce(
    (prev, curr) => ({ ...prev, [curr]: true }),
    {}
  )

  useEffect(() => {
    if (session?.user?.accessToken && position)
      fetcher
        .post("/distance/get-nearby", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
          body: {
            radius: 10000,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        .then((data) => setData((data as any).marks))
        .finally(() => setIsLoading(false))
  }, [session, position])

  const list = data?.slice(0, 12)
  const filtered = list?.filter(
    (item: any) =>
      !Number.isInteger(active) || item.type === active
  )

  const categories: number[] = Object.keys(
    list?.reduce(
      (prev: any, cur: any) => ({ ...prev, [cur.type]: true }),
      {}
    ) ?? {}
  ).map(Number)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="py-4 px-2">
        <Filters
          active={active}
          setActive={setActive}
          categories={categories}
        />
      </div>

      {isLoading && <Loader className="mx-auto text-2xl" />}

      {(data as any)?.length && (
        <div className="w-full h-full">
          <Bubbles completed={completedIds} marks={filtered} />
        </div>
      )}
    </div>
  )
}
