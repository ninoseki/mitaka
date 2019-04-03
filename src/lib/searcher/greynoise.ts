import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class GreyNoise implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    this.endpoint = "https://viz.greynoise.io";
    this.name = "GreyNoise";
  }

  public searchByIP(query: string): string {
    return buildURL(this.endpoint, `/ip/${query}`);
  }
}
