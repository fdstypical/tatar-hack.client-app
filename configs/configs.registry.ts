export class ConfigsRegistry {
  public static protocol = "https";

  public get RootUrl(): string {
    try {
      const vercelUrl = this.get("VERCEL_URL");
      const targetUrl = new URL(`${ConfigsRegistry.protocol}://${vercelUrl}`);

      return targetUrl.origin;
    } catch (error) {
      if (error instanceof TypeError)
        throw new TypeError("Invalid url", { cause: error });

      return this.ROOT;
    }
  }

  public getUrl(
    next: string,
    params?: Record<string, string | number | boolean>
  ): URL {
    const url = new URL(next, this.RootUrl);

    for (const param in params) {
      url.searchParams.set(param, params[param].toString());
    }

    return url;
  }

  public get(key: string): string {
    const value = process.env[key];

    if (!value) throw new Error(`${key} environment variable does not set`);

    return value;
  }

  public getNumber(key: string): number {
    const value = Number(this.get(key));

    if (Number.isNaN(value))
      throw new Error(`${key} environment variable does not valie number`);

    return value;
  }

  protected get ROOT(): string {
    if (!process.env.NEXT_PUBLIC_ROOT)
      throw new Error("NEXT_PUBLIC_ROOT environment variable does not set");

    return process.env.NEXT_PUBLIC_ROOT;
  }
}

export default new ConfigsRegistry();
