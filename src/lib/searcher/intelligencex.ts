import * as crypto from "crypto-js";
import * as url from "url";
import { Searcher } from "./searcher";

export class IntelligenceX implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["ip", "domain", "url", "email", "btc"];

  constructor() {
    this.endpoint = "https://intelx.io";
    this.name = "IntelligenceX";
  }

  public searchByIP(query) {
    return this.search(query);
  }

  public searchByDomain(query) {
    return this.search(query);
  }

  public searchByURL(query) {
    return this.search(query);
  }

  public searchByEmail(query) {
    return this.search(query);
  }

  public searchByBTC(query) {
    return this.search(query);
  }

  private search(query) {
    return `${this.endpoint}/?s=${query}`
  }
}
