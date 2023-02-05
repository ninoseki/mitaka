import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class WebAnalyzer implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.baseURL = "https://wa-com.com";
    this.name = "WebAnalyzer";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }
}
