import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class DNSlytics implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://dnslytics.com";
    this.name = "DNSlytics";
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, `/ip/${query}`);
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, `/domain/${query}`);
  }
}
