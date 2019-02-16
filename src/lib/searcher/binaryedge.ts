import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class BinaryEdge implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://app.binaryedge.io";
    this.name = "BinaryEdge";
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, "/services/query", { query: `ip:"${query}"` });
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, "/services/domains", { query });
  }
}
