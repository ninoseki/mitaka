import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/urlBuilder";

export class URLVoid implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.baseURL = "https://www.urlvoid.com";
    this.name = "URLVoid";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/scan/${query}`);
  }

  public search(query: string): string {
    return buildURL(this.baseURL, `/scan/${query}`);
  }
}
