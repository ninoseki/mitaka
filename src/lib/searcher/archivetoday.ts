import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class ArchiveToday implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["url"];

  public constructor() {
    this.endpoint = "http://archive.fo";
    this.name = "archive.today";
  }

  public searchByURL(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
