import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class Robtex extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip"];

  public constructor() {
    super();
    this.baseURL = "https://www.robtex.com";
    this.name = "Robtex";
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/dns-lookup/${query}`));
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip-lookup/${query}`));
  }
}
