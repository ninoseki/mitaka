import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";

export class InQuest implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://labs.inquest.net";
    this.name = "InQuest";
  }

  public searchByHash(query: string): string {
    if (query.length !== 64) {
      throw new Error("InQuest supports SHA256 hash only");
    }
    return buildURL(this.baseURL, `/dfi/sha256/${query}`);
  }
}
