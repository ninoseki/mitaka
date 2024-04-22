import { err, ok, Result } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class APKLab extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["hash"];

  public constructor() {
    super();
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
