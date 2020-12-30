import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/url_builder";

export class AbuseIPDB implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    this.baseURL = "https://www.abuseipdb.com";
    this.name = "AbuseIPDB";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/check/${query}`);
  }
}
