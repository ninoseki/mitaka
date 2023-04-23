import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class GreyNoise implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn", "cve"];

  public constructor() {
    this.baseURL = "https://viz.greynoise.io";
    this.name = "GreyNoise";
  }

  public searchByIP(query: string): string {
    return this.search(`ip:${query}`);
  }

  public searchByDomain(query: string): string {
    return this.search(`metadata.rdns:${query}`);
  }

  public searchByASN(query: string): string {
    return this.search(`metadata.asn:${query}`);
  }

  public searchByCVE(query: string): string {
    return this.search(`cve:${query}`);
  }

  private search(gnql: string): string {
    return buildURL(this.baseURL, "/query", { gnql: gnql });
  }
}
