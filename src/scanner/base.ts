import { err, Result } from "neverthrow";

import type { ScannableType, Scanner } from "~/types";

export class Base implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = [];
  public apiKey: string | undefined = undefined;

  public constructor() {
    this.baseURL = "http://example.com";
    this.name = "Base";
  }

  public setAPIKey(apiKey: string | undefined): void {
    this.apiKey = apiKey;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async scanByURL(url: string): Promise<Result<string, string>> {
    return err("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async scanByIP(url: string): Promise<Result<string, string>> {
    return err("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async scanByDomain(url: string): Promise<Result<string, string>> {
    return err("Not implemented");
  }
}
