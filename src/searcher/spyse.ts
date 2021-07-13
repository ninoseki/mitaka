import { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/urlBuilder";
import { extractASNumber } from "@/utility";

export class Spyse implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "asn", "cve"];

  public constructor() {
    this.baseURL = "https://spyse.com";
    this.name = "Spyse";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/target/ip/${query}`);
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/target/domain/${query}`);
  }

  public searchByASN(query: string): string {
    const asn = extractASNumber(query);
    return buildURL(this.baseURL, `/target/as/${asn}`);
  }

  public searchByCVE(query: string): string {
    return buildURL(this.baseURL, `/target/cve/${query}`);
  }
}
