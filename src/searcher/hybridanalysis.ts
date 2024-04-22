import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class HybridAnalysis extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    super();
    this.baseURL = "https://www.hybrid-analysis.com";
    this.name = "HybridAnalysis";
  }

  public searchByHash(query: string) {
    return ok(buildURL(this.baseURL, "/search", { query: `${query}` }));
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, "/search", { query: `host:${query}` }));
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, "/search", { query: `domain:${query}` }));
  }
}
