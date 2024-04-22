import { err, ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class InQuest extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    super();
    this.baseURL = "https://labs.inquest.net";
    this.name = "InQuest";
  }

  public searchByHash(query: string) {
    if (query.length !== 64) {
      return err("InQuest supports SHA256 hash only");
    }
    return ok(buildURL(this.baseURL, `/dfi/sha256/${query}`));
  }
}
