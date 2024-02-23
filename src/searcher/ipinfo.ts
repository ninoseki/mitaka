import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

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
