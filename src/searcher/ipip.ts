import { ok } from "neverthrow";

import type { SearchableType } from "~/schemas";
import { buildURL, extractASNumber } from "~/utils";

import { Base } from "./base";

export class IPIP extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "asn"];

  public constructor() {
    super();
    this.baseURL = "https://en.ipip.net";
    this.name = "IPIP";
  }

  public searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}.html`));
  }

  public searchByASN(query: string) {
    const number: string = extractASNumber(query);
    return ok(buildURL("https://whois.ipip.net", `/AS${number}`));
  }
}
