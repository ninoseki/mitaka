import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class DomainBigData implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.endpoint = "https://domainbigdata.com";
    this.name = "DomainBigData";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }

  public searchByEmail(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
