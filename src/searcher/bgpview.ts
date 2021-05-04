import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/urlBuilder";
import { extractASNumber } from "@/utility";

export class BGPView implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    this.baseURL = "https://bgpview.io";
    this.name = "BGPView";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ip/${query}`);
  }

  public searchByASN(query: string): string {
    const number: string = extractASNumber(query);
    return buildURL(this.baseURL, `/asn/${number}`);
  }
}
