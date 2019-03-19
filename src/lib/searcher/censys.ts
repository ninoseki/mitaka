import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Censys implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn", "text"];

  public constructor() {
    this.endpoint = "https://censys.io";
    this.name = "Censys";
  }

  public searchByText(query: string) {
    return buildURL(this.endpoint, "/ipv4", { q: query });
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, `/ipv4/${query}`);
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, `/domain/${query}`);
  }

  public searchByASN(query: string) {
    const matches = query.match(/\d+$/);
    if (matches !== null && matches[0]) {
      return buildURL(this.endpoint, "/ipv4", {
        q: `autonomous_system.asn:${matches[0]}`,
      });
    }
    return "";
  }
}
