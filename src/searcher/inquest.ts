import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";
import { ok, err, Result } from "neverthrow";

export class InQuest implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://labs.inquest.net";
    this.name = "InQuest";
  }

  public searchByHash(query: string): Result<string, string> {
    if (query.length !== 64) {
      return err("InQuest supports SHA256 hash only");
    }
    return ok(buildURL(this.baseURL, `/dfi/sha256/${query}`));
  }
}
