import { SearchableType, Searcher } from "./searcher";
import { buildURL } from "../url_builder";

export class Malshare implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.endpoint = "https://www.malshare.com";
    this.name = "MalShare";
  }

  public searchByHash(query: string): string {
    return buildURL(this.endpoint, "/sample.php", {
      action: "detail",
      hash: query,
    });
  }
}
