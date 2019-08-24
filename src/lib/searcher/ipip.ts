import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";
import { extractASNumber } from "../utility";

export class IPIP implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    this.endpoint = "https://en.ipip.net";
    this.name = "IPIP";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/ip/${query}.html`);
  }

  public searchByASN(query: string): string {
    const number: string = extractASNumber(query);
    return buildURL("https://whois.ipip.net", `/AS${number}`);
  }
}
