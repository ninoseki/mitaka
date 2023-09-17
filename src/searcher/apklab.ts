import type { SearchableType, Searcher } from "~/types";
import { buildURL } from "~/utils";
import { ok, err, Result } from "neverthrow";

export class APKLab implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    this.baseURL = "https://www.apklab.io";
    this.name = "Apklab";
  }

  public searchByHash(query: string): Result<string, string> {
    if (query.length !== 64) {
      return err("apklab supports only SHA256 hash");
    }

    return ok(buildURL(this.baseURL, "/apk.html", { hash: query }));
  }
}
