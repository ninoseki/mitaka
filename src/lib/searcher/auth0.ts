import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class Auth0 implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip"];

  public constructor() {
    this.baseURL = "https://auth0.com";
    this.name = "Auth0";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/signals/ip/${query}-report`);
  }
}
