import { SearchableType, Searcher } from "./searcher";

export class Urlscan implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["ip", "domain", "url"];

  constructor() {
    this.endpoint = "https://urlscan.io/api/v1";
    this.name = "Urlscan";
  }

  searchByIP(query) {
    const encoded = encodeURIComponent(query);
    return this.search(encoded);
  }

  searchByDomain(query) {
    const encoded = encodeURIComponent(query);
    return this.search(encoded);
  }

  searchByURL(query) {
    const encoded = encodeURIComponent(`"${query}"`);
    return this.search(encoded);
  }

  search(query) {
    const url = `https://urlscan.io/search/`;
    return `${url}#${query}`;
  }
}
