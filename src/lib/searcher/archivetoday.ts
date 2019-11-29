import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

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
