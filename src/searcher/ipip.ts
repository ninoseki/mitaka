import type { SearchableType, Searcher } from "~/types";
import { buildURL, extractASNumber } from "~/utils";

export class IPIP implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    this.baseURL = "https://en.ipip.net";
    this.name = "IPIP";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ip/${query}.html`);
  }

  public searchByASN(query: string): string {
    const number: string = extractASNumber(query);
    return buildURL("https://whois.ipip.net", `/AS${number}`);
  }
}
