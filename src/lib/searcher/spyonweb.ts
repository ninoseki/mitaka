import { Searcher } from "./searcher";

export class SpyOnWeb implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: string[] = ["ip", "domain", "gaPubID", "gaTrackID"];

  constructor() {
    this.endpoint = "http://spyonweb.com";
    this.name = "SpyOnWeb";
  }

  public searchByIP(query) {
    return this.search(query);
  }

  public searchByDomain(query) {
    return this.search(query);
  }

  public searchByGAPubID(query) {
    return this.search(query);
  }

  public searchByGATrackID(query) {
    return this.search(query);
  }

  private search(query) {
    return `${this.endpoint}/${query}`;
  }
}
