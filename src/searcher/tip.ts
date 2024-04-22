import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class TIP extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    super();
    this.baseURL = "https://threatintelligenceplatform.com";
    this.name = "TIP";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/report/${query}/`));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/report/${query}/`));
  }
}
