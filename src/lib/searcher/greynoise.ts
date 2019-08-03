import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class GreyNoise implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn"];

  public constructor() {
    this.endpoint = "https://viz.greynoise.io";
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

  private search(gnql: string): string {
    return buildURL(this.endpoint, "/query", { gnql: gnql });
  }
}
