import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class BinaryEdge implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.baseURL = "https://app.binaryedge.io";
    this.name = "BinaryEdge";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, "/services/query", {
      query: `ip:"${query}"`,
    });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, "/services/domains", { query });
  }
}
