import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Censys implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["text"];

  constructor() {
    this.endpoint = "https://censys.io";
    this.name = "Censys";
  }

  public searchByText(query: string) {
    return buildURL(this.endpoint, "/ipv4", { q: query });
  }
}
