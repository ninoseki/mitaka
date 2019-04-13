import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class TIP implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.endpoint = "https://threatintelligenceplatform.com";
    this.name = "TIP";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/report/${query}/`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/report/${query}/`);
  }
}
