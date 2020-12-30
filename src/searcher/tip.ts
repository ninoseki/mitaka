import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/url_builder";

export class TIP implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.baseURL = "https://threatintelligenceplatform.com";
    this.name = "TIP";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/report/${query}/`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/report/${query}/`);
  }
}
