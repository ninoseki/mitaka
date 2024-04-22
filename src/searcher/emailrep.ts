import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL } from "~/utils";

import { Base } from "./base";

export class EmailRep extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["email"];

  public constructor() {
    super();
    this.baseURL = "https://emailrep.io";
    this.name = "EmailRep";
  }

  public searchByEmail(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`));
  }
}
