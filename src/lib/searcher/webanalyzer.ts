import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class WebAnalyzer implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.endpoint = "https://wa-com.com";
    this.name = "WebAnalyzer";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
