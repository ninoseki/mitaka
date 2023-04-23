import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class APKLab implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://www.apklab.io";
    this.name = "Apklab";
  }

  public searchByHash(query: string): string {
    if (query.length !== 64) {
      throw new Error("apklab supports only SHA256 hash");
    }

    return buildURL(this.baseURL, "/apk.html", { hash: query });
  }
}
