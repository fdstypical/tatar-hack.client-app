export const login = async (
  credentials: Record<"email" | "password", string>
) => {
  const res = await fetch("http://92.51.47.29:81/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) throw new Error("Bad Credentials")

  const response = await res.json()
  return response
}

export const refresh = async (
  access: string,
  refresh: string
) => {
  const res = await fetch(
    "http://92.51.47.29:81/token/refresh-token",
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
  return response
}
