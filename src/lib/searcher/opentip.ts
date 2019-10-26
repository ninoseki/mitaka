import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class OpenTIP implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.endpoint = "https://opentip.kaspersky.com";
    this.name = "OpenTIP";
  }

  public searchByHash(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
