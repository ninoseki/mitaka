import type { SearchableType, Searcher } from "@/types";
import { buildURL } from "@/utils";

export class NVD implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.baseURL = "https://nvd.nist.gov";
    this.name = "NVD";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.baseURL, `/vuln/detail/${query}`);
  }
}
