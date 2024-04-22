import { ok, Result } from "neverthrow";

import type { ScannableType } from "~/types";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Browserling extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];
  public apiKey: string | undefined = undefined;

  public constructor() {
    super();
    this.baseURL = "https://www.browserling.com";
    this.name = "Browserling";
  }

  public async scanByURL(url: string): Promise<Result<string, string>> {
    return ok(
      buildURL(this.baseURL, `/browse/win/7/ie/11/${encodeURIComponent(url)}`),
    );
  }
}
