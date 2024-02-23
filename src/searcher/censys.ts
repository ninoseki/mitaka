import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL, extractASNumber } from "~/utils";

export class Censys implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn", "domain", "email"];

  public constructor() {
    this.baseURL = "https://search.censys.io";
    this.name = "Censys";
  }

  public searchByIP(query: string): string {
    return buildURL(this.baseURL, `/hosts/${query}`);
  }

  public searchByASN(query: string): string {
    const asn = extractASNumber(query);
    return buildURL(this.baseURL, "/search", {
      q: `autonomous_system.asn:${asn}`,
      resource: "hosts",
    });
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, "/search", {
      q: `parsed.names:${query}`,
      resource: "certificates",
    });
  }

  public searchByEmail(query: string): string {
    return buildURL(this.baseURL, "/search", {
      q: `parsed.subject.email_address:${query}`,
      resource: "certificates",
    });
  }
}
