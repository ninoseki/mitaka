import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Shodan implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["text"];

  constructor() {
    this.endpoint = `https://www.shodan.io`;
    this.name = "Shodan";
  }

  public searchByText(query: string) {
    return buildURL(this.endpoint, "/search", { query });
  }
}
