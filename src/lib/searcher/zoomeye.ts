import { SearchableType, Searcher } from "./searcher";

export class ZoomEye implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["ip"];

  constructor() {
    this.endpoint = "https://www.zoomeye.org";
    this.name = "ZoomEye";
  }

  searchByIP(query) {
    const encoded = encodeURIComponent(`ip:"${query}"`);
    return `${this.endpoint}/searchResult?q=${encoded}&t=host`;
  }
}
