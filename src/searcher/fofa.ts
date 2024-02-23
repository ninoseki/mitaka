import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { base64fy, buildURL } from "~/utils";

export class FOFA implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  public constructor() {
    this.baseURL = "https://fofa.so";
    this.name = "FOFA";
  }

  public searchByIP(query: string): string {
    return this.search(`ip="${query}"`);
  }

  public searchByDomain(query: string): string {
    return this.search(`domain="${query}"`);
  }

  private search(query: string): string {
    return buildURL(this.baseURL, "/result", { qbase64: base64fy(query) });
  }
}
