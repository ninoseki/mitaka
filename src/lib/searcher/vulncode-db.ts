import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class VulncodeDB implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.endpoint = "https://www.vulncode-db.com";
    this.name = "VulncodeDB";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
