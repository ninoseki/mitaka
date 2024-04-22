import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class AbuseIPDB extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    super();
    this.baseURL = "https://www.abuseipdb.com";
    this.name = "AbuseIPDB";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/check/${query}`));
  }
}
