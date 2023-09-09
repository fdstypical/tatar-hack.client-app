import configsRegistry from "@/configs/configs.registry"
import { omit } from "@/utils/fields"
import {
  FetcherError,
  FetcherParams,
  FetcherQueryParams,
  FetcherUri,
  OnErrorCallback,
  RequestMethods,
} from "./types"

export abstract class BaseFetcher {
  constructor(
    protected headersGetter?: () => HeadersInit,
    protected _onError?: OnErrorCallback
  ) {}

  protected get onError(): OnErrorCallback | undefined {
    return this._onError
  }

  protected setOnErrorCallback(onError: OnErrorCallback): void {
    this._onError = onError
  }

  protected async process<T = any, D = any>(
    input: FetcherUri,
    init?: FetcherParams<D>
  ): Promise<T> {
    const headers = this.headersGetter?.()

    const res = await fetch(
      this.createUri(input, init?.params),
      {
        headers: {
          ...headers,
          ...init?.headers,
          "Content-Type": "application/json",
        },
        ...(init && omit(init, "body")),
        ...(init?.body && {
          body: JSON.stringify(init.body),
        }),
        next: {
          revalidate: init?.revalidate ?? 120,
          tags: init?.tags ?? undefined,
        },
      }
    )

    const response = await res.json()

    if (res.ok) {
      return response
    }

    const error = new Error(
      response?.message ?? res.statusText
    ) as FetcherError
    error.response = response
    this._onError?.(error)

    return Promise.reject(error)
  }

  public createUri(
    uri: FetcherUri,
    params?: FetcherQueryParams
  ): string {
    const queryParams = new URLSearchParams()

    for (const prop in params) {
      queryParams.append(prop, params[prop].toString())
    }

    const queries = queryParams.toString()
    const queryString = queries.length > 0 ? `?${queries}` : ""

    return `${configsRegistry.RootUrl}${uri}${queryString}`
  }

  public get<T>(
    input: FetcherUri,
    init?: FetcherParams
  ): Promise<T> {
    return this.process(input, {
      ...init,
      method: RequestMethods.GET,
    })
  }

  public post<T, D>(
    input: FetcherUri,
    init?: FetcherParams<D>
  ): Promise<T> {
    return this.process(input, {
      ...init,
      method: RequestMethods.POST,
    })
  }

  public put<T, D>(
    input: FetcherUri,
    init?: FetcherParams<D>
  ): Promise<T> {
    return this.process(input, {
      ...init,
      method: RequestMethods.PUT,
    })
  }

  public patch<T, D>(
    input: FetcherUri,
    init?: FetcherParams<D>
  ): Promise<T> {
    return this.process(input, {
      ...init,
      method: RequestMethods.PATCH,
    })
  }

  public delete<T, D>(
    input: FetcherUri,
    init?: FetcherParams<D>
  ): Promise<T> {
    return this.process(input, {
      ...init,
      method: RequestMethods.DELETE,
    })
  }
}
