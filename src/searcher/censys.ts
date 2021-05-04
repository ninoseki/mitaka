import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/urlBuilder";
import { extractASNumber } from "@/utility";

export class Censys implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn"];

  public constructor() {
    this.baseURL = "https://censys.io";
    this.name = "Censys";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ipv4/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/domain/${query}`);
  }

  public searchByASN(query: string): string {
    const asn = extractASNumber(query);
    return buildURL(this.baseURL, "/ipv4", {
      q: `autonomous_system.asn:${asn}`,
    });
  }
}
