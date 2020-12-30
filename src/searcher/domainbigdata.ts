import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/url_builder";

export class DomainBigData implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain", "ip", "email"];

  public constructor() {
    this.baseURL = "https://domainbigdata.com";
    this.name = "DomainBigData";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }

  public searchByEmail(query: string): string {
    return buildURL(this.baseURL, `/email/${query}`);
  }
}
