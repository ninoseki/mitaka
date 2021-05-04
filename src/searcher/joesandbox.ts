import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/urlBuilder";

export class JoeSandbox implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://www.joesandbox.com";
    this.name = "JoeSandbox";
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, `/search`, { q: query });
  }
}
