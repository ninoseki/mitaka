import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class ArchiveOrg implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["url"];

  public constructor() {
    this.baseURL = "https://web.archive.org";
    this.name = "archive.org";
  }

  public searchByURL(query: string): string {
    return buildURL(this.baseURL, `/web/*/${query}`);
  }
}
