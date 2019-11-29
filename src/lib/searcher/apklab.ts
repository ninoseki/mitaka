import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";
import { extractASNumber } from "../utility";

export class Apklab implements Searcher {
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

    return `https://www.apklab.io/apk.html?hash=${query}`;
  }
}
