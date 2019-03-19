import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class PublicWWW implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["text"];

  public constructor() {
    this.endpoint = "https://publicwww.com/websites";
    this.name = "PublicWWW";
  }

  public searchByText(query: string) {
    return buildURL(this.endpoint, `/${encodeURIComponent(query)}`);
  }
}
