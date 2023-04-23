import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class VMRay implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://www.vmray.com";
    this.name = "VMRay";
  }

  public searchByHash(query: string): string {
    if (query.length !== 64) {
      throw new Error("VMRay supports SHA256 hash only");
    }
    const trimmed = query.substring(0, 12);
    return buildURL(this.baseURL, `/analyses/${trimmed}/report/overview.html`);
  }
}
