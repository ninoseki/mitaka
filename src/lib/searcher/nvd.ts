import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";

export class NVD implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["cve"];

  public constructor() {
    this.endpoint = "https://nvd.nist.gov";
    this.name = "NVD";
  }

  public searchByCVE(query: string): string {
    return buildURL(this.endpoint, `/vuln/detail/${query}`);
  }
}
