import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class AbuseIPDB implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    this.endpoint = "https://www.abuseipdb.com";
    this.name = "AbuseIPDB";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/check/${query}`);
  }
}
