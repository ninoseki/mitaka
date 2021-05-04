import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/urlBuilder";

export class IPinfo implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    this.baseURL = "https://ipinfo.io";
    this.name = "IPinfo";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }

  public searchByASN(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }
}
