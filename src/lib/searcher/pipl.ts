import { SearchableType, Searcher } from "./searcher";

export class Pipl implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["email"];

  constructor() {
    this.endpoint = "https://pipl.com";
    this.name = "Pipl";
  }

  searchByEmail(query) {
    return `${this.endpoint}/search/?q=${encodeURIComponent(query)}`;
  }
}
