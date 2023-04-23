import type { SearchableType, Searcher } from "~/types";
import { buildURL, extractASNumber } from "~/utils";

export class HurricaneElectric implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn"];

  public constructor() {
    this.baseURL = "https://bgp.he.net";
    this.name = "HurricaneElectric";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/dns/${query}`);
  }

  public searchByASN(query: string): string {
    const asn = extractASNumber(query);
    return buildURL(this.baseURL, `/AS${asn}`);
  }
}
