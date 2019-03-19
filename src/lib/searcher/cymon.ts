import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class Cymon implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.endpoint = "https://cymon.io";
    this.name = "Cymon";
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, `/${query}`);
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, `/domain/${query}`);
  }
}
