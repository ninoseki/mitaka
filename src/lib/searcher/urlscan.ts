import { SearchableType, Searcher } from "./searcher";

export class Urlscan implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "url"];

  constructor() {
    this.endpoint = "https://urlscan.io/api/v1";
    this.name = "Urlscan";
  }

  public searchByIP(query) {
    const encoded = encodeURIComponent(query);
    return this.search(encoded);
  }

  public searchByDomain(query) {
    const encoded = encodeURIComponent(query);
    return this.search(encoded);
  }

  public searchByURL(query) {
    const encoded = encodeURIComponent(`"${query}"`);
    return this.search(encoded);
  }

  public search(query) {
    const url = `https://urlscan.io/search/`;
    return `${url}#${query}`;
  }
}
