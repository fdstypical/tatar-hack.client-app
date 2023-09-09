export class ConfigsRegistry {
  public get ApiUrl(): string {
    return process.env.NEXT_PUBLIC_API_URL || ""
  }

  public get(key: string): string {
    const value = process.env[key]

    if (!value)
      throw new Error(`${key} environment variable does not set`)

    return value
  }

  public getNumber(key: string): number {
    const value = Number(this.get(key))

    if (Number.isNaN(value))
      throw new Error(
        `${key} environment variable does not valie number`
      )

    return value
  }
}

export default new ConfigsRegistry()
