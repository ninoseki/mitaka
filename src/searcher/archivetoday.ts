import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class ArchiveToday extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["url"];

  public constructor() {
    super();
    this.baseURL = "http://archive.fo";
    this.name = "archive.today";
  }

  public searchByURL(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`));
  }
}
