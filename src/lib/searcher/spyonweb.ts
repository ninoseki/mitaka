import { SearchableType, Searcher } from "./searcher";

export class SpyOnWeb implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["ip", "domain", "gaPubID", "gaTrackID"];

  constructor() {
    this.endpoint = "http://spyonweb.com";
    this.name = "SpyOnWeb";
  }

  searchByIP(query) {
    return this.search(query);
  }

  searchByDomain(query) {
    return this.search(query);
  }

  searchByGAPubID(query) {
    return this.search(query);
  }

  searchByGATrackID(query) {
    return this.search(query);
  }

  private search(query) {
    return `${this.endpoint}/${query}`;
  }
}
