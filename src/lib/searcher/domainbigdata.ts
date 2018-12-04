import { SearchableType, Searcher } from "./searcher";

export class DomainBigData implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["domain"];

  constructor() {
    this.endpoint = "https://domainbigdata.com";
    this.name = "DomainBigData";
  }

  searchByDomain(query) {
    return `${this.endpoint}/${query}`;
  }
}
