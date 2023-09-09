export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    return null
  }
}

export const login = async (
  credentials: Record<"email" | "password", string>
) => {
  const res = await fetch(
    "https://kzn-hack.duckdns.org/auth/login",
    {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (!res.ok) throw new Error("Bad Credentials")

  const response = await res.json()
  return response
}

export const refresh = async (
  access: string,
  refresh: string
) => {
  const res = await fetch(
    "https://kzn-hack.duckdns.org/token/refresh-token",
    {
      method: "POST",
      body: JSON.stringify({
        accessToken: access,
        refreshToken: refresh,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (!res.ok) throw new Error("Invalid token pair")

  const response = await res.json()
  const payload = parseJwt(response.accessToken)
  return {
    ...response,
    iat: Math.ceil(Date.now() / 1000),
    exp: payload.exp,
  }
}
