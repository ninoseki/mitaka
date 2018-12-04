import { SearchableType, Searcher } from "./searcher";

export class PublicWWW implements Searcher {

  endpoint: string;
  name: string;
  supportedTypes: SearchableType[] = ["text"];

  constructor() {
    this.endpoint = "https://publicwww.com/websites";
    this.name = "PublicWWW";
  }

  searchByText(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/${encoded}`;
  }
}
