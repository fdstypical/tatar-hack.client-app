export enum Pages {
  SignIn = "/signin",
  SignUp = "/signup",
  Choice = "/choice",
  Index = "/",
}

export type GetUrlConfig = {
  id?: string
  params?: Record<string, string>
}

export const GetUrl = (page: Pages, config?: GetUrlConfig) => {
  const _id = config?.id ? `/${config.id}` : ""
  const query = new URLSearchParams(config?.params)
  const search = query.size ? `?${query.toString()}` : ""

  return `${page}${_id}${search}`
}
