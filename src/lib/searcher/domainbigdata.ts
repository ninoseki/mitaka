import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

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
}
