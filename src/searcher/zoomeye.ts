import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/urlBuilder";

export class ZoomEye implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    this.baseURL = "https://www.zoomeye.org";
    this.name = "ZoomEye";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, "/searchResult", {
      q: `ip:"${query}"`,
      t: "host",
    });
  }
}
