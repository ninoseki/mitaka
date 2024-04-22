import type { SearchableType } from "~/schemas";

import { Base } from "./base";

export class All extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [];

  public constructor() {
    super();
    this.baseURL = "https://example.com";
    this.name = "all";
  }
}
