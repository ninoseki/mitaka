import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

export class Hostio implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["domain"];

  public constructor() {
    this.baseURL = "https://host.io";
    this.name = "Host.io";
  }

  public searchByDomain(query: string): string {
    return buildURL(this.baseURL, `/${query}`);
  }
}
