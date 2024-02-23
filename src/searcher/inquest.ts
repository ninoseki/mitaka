import { err, ok, Result } from "neverthrow";

import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";
import { buildURL } from "~/utils";

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
