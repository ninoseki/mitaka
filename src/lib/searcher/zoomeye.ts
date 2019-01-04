import { SearchableType, Searcher } from "./searcher";

export class ZoomEye implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  constructor() {
    this.endpoint = "https://www.zoomeye.org";
    this.name = "ZoomEye";
  }

  public searchByIP(query) {
    const encoded = encodeURIComponent(`ip:"${query}"`);
    return `${this.endpoint}/searchResult?q=${encoded}&t=host`;
  }
}
