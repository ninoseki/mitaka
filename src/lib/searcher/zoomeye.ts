import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class ZoomEye implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    this.endpoint = "https://www.zoomeye.org";
    this.name = "ZoomEye";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, "/searchResult", {
      q: `ip:"${query}"`,
      t: "host",
    });
  }
}
