import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class ArchiveOrg implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["url"];

  constructor() {
    this.endpoint = "https://web.archive.org";
    this.name = "archive.org";
  }

  public searchByURL(query: string) {
    return buildURL(this.endpoint, `/web/*/${query}`);
  }
}
