import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class BinaryEdge extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    super();
    this.baseURL = "https://app.binaryedge.io";
    this.name = "BinaryEdge";
  }

  public searchByIP(query: string) {
    return ok(
      buildURL(this.baseURL, "/services/query", {
        query: `ip:"${query}"`,
      }),
    );
  }

  public searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, "/services/domains", { query }));
  }
}
