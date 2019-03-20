import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Vulmon implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.endpoint = "https://vulmon.com";
    this.name = "Vulmon";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.endpoint, "/vulnerabilitydetails", { qid: query });
  }
}
