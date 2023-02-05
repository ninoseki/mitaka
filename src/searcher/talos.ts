import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class Talos implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.baseURL = "https://talosintelligence.com";
    this.name = "Talos";
  }

  public searchByIP(query: string): string {
    return this.search(query);
  }

  public searchByDomain(query: string): string {
    return this.search(query);
  }

  private search(query: string): string {
    return buildURL(this.baseURL, "/reputation_center/lookup", {
      search: query,
    });
  }
}
