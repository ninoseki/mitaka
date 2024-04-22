import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class IntelligenceX extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [
    "ip",
    "domain",
    "url",
    "email",
    "btc",
  ];

  public constructor() {
    super();
    this.baseURL = "https://intelx.io";
    this.name = "IntelligenceX";
  }

  public searchByIP(query: string) {
    return this.search(query);
  }

  public searchByDomain(query: string) {
    return this.search(query);
  }

  public searchByURL(query: string) {
    return this.search(query);
  }

  public searchByEmail(query: string) {
    return this.search(query);
  }

  public searchByBTC(query: string) {
    return this.search(query);
  }

  private search(query: string) {
    return ok(buildURL(this.baseURL, "/", { s: query }));
  }
}
