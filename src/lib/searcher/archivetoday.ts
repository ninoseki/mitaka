import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class ArchiveToday implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["url"];

  public constructor() {
    this.baseURL = "http://archive.fo";
    this.name = "archive.today";
  }

  public searchByURL(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }
}
