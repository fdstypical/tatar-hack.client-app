"use client"

import { Loader } from "@/components/ui"
import { useWatchPostion } from "@/hooks"
import { fetcher } from "@/libs/apis/fetcher"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Mark({
  params,
}: {
  params: { id: string }
}) {
  const { data: session } = useSession()
  const { position } = useWatchPostion()
  const [data, setDate] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (session?.user?.accessToken && position)
      fetcher
        .post("/distance/get-to-mark", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
          body: {
            markId: params.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        })
        .then(setDate)
        .finally(() => setIsLoading(false))
  }, [session, position])

  return (
    <div className="w-full h-full">
      {isLoading && <Loader className="mx-auto text-2xl" />}
      {data && (
        <div>
          <h1>{data.mark.emojifiedTitle}</h1>

          {data.distanceInMeters}
        </div>
      )}
    </div>
  )
}
