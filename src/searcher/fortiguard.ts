import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class FortiGuard extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "url", "cve"];

  public constructor() {
    super();
    this.baseURL = "https://fortiguard.com";
    this.name = "FortiGuard";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, "/search", { q: query, engine: 7 }));
  }

  public searchByURL(query: string) {
    return ok(buildURL(this.baseURL, "/search", { q: query, engine: 7 }));
  }

  public searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, "/search", { q: query, engine: 3 }));
  }
}
