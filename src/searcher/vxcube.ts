import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

export class VxCube implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  public constructor() {
    this.baseURL = "http://vxcube.com";
    this.name = "VxCube";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/tools/ip/${query}/whois`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/tools/domain/${query}/whois`);
  }

  public searchByHash(query: string): string {
    return buildURL(this.baseURL, `/result/${query}`);
  }
}
