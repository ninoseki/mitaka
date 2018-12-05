import { SearchableType, Searcher } from "./searcher";

export class Pipl implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: SearchableType[] = ["email"];

  constructor() {
    this.endpoint = "https://pipl.com";
    this.name = "Pipl";
  }

  public searchByEmail(query) {
    return `${this.endpoint}/search/?q=${encodeURIComponent(query)}`;
  }
}
