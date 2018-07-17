import { Searcher } from "./searcher";

export class Censys implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["text"];

  constructor() {
    this.endpoint = "https://censys.io";
    this.name = "Censys";
  }

  public searchByText(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/ipv4?q=${encoded}`;
  }
}
