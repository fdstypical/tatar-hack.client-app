import {
  FetcherError,
  FetcherParams,
  FetcherUri,
} from "@/libs/apis/types"
import { Nullable } from "@/types/common"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export type FetcherType<T, D> = (
  init?: FetcherParams<D>
) => Promise<T>

export interface IUseFetch<T> {
  data: Nullable<T>
  error: Nullable<FetcherError>
  isLoading: boolean
}

export const useFetch = <T, D>(
  fetcher: FetcherType<T, D>
): IUseFetch<T> => {
  const { data: session } = useSession()

  const [data, setDate] = useState<Nullable<T>>(null)
  const [error, setError] =
    useState<Nullable<FetcherError>>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (session?.user?.accessToken)
      fetcher({
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      })
        .then(setDate)
        .catch(setError)
        .finally(() => setIsLoading(false))
  }, [session])

  return { data, error, isLoading }
}
