import { SearchableType, Searcher } from "./searcher";

export class DomainBigData implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  constructor() {
    this.endpoint = "https://domainbigdata.com";
    this.name = "DomainBigData";
  }

  public searchByDomain(query) {
    return `${this.endpoint}/${query}`;
  }
}
