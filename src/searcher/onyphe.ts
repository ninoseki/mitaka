import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ONYPHE extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    super();
    this.baseURL = "https://search.onyphe.io";
    this.name = "ONYPHE";
  }

  /**
   * Search Onyphe by IP with selectable category.
   * @param query IP address
   * @param type "datascan" | "ctiscan" (default: datascan)
   */
  public searchByIP(query: string, type: "datascan" | "ctiscan" = "datascan") {
    if (type === "ctiscan") {
      // ctiscan uses ip.dest, not ip
      return ok(
        buildURL(this.baseURL, "/search", { q: `category:ctiscan ip.dest:${query}` })
      );
    }
    // default: datascan
    return ok(
      buildURL(this.baseURL, "/search", { q: `category:datascan ip:${query}` })
    );
  }
}