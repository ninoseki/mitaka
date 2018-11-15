import { SearchableType, Searcher } from "./searcher";

import * as crypto from "crypto-js";

export class FOFA implements Searcher {

  public endpoint: string;
  public name;
  public supportedTypes: SearchableType[] = ["ip", "domain"];

  constructor() {
    this.endpoint = "https://fofa.so";
    this.name = "FOFA";
  }

  public searchByIP(query) {
    const param = `ip="${query}"`;
    return `${this.endpoint}/result?qbase64=${this.base64fy(param)}`;
  }

  public searchByDomain(query) {
    const param = `domain="${query}"`;
    return `${this.endpoint}/result?qbase64=${this.base64fy(param)}`;
  }

  private base64fy(s: string): string {
    const wordArray = crypto.enc.Utf8.parse(s);
    return crypto.enc.Base64.stringify(wordArray).trim();
  }
}
