import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class AbuseIPDB implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    this.endpoint = "https://www.abuseipdb.com";
    this.name = "AbuseIPDB";
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, `/check/${query}`);
  }
}
