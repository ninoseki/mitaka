import type { SearchableType, Searcher } from "@/types";
import { extractASNumber } from "@/utils";
import { buildURL } from "@/utils";

export class Urlscan implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn", "url"];

  public constructor() {
    this.baseURL = "https://urlscan.io";
    this.name = "urlscan.io";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/domain/${query}`);
  }

  public searchByASN(query: string): string {
    const number: string = extractASNumber(query);
    return buildURL(this.baseURL, `/asn/AS${number}`);
  }

  public searchByURL(query: string): string {
    return this.search(
      encodeURIComponent(`page.url:"${query}" OR task.url:"${query}"`)
    );
  }

  private search(query: string): string {
    return buildURL(this.baseURL, `/search/#${query}`);
  }
}
