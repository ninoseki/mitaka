import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class IPinfo implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    this.endpoint = "https://ipinfo.io";
    this.name = "IPinfo";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }

  public searchByASN(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
