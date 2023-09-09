export type FetcherError = Error & { response: any }

export type FetcherUri = URL | string

export type FetcherQueryParams = Record<
  string,
  string | number | boolean
>

export type OnErrorCallback = (error: FetcherError) => void

export type FetcherParams<D = any> = {
  body?: D
  params?: FetcherQueryParams
} & NextFetchRequestConfig &
  Omit<RequestInit, "body">

export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
