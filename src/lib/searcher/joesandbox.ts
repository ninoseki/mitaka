import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class JoeSandbox implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.endpoint = "https://www.joesandbox.com";
    this.name = "JoeSandbox";
  }

  public searchByHash(query: string): string {
    return buildURL(this.endpoint, `/search`, { q: query });
  }
}
