import * as crypto from "crypto-js";
import { Searcher } from "./searcher";

export class Pulsedive implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["ip", "domain", "url", "hash"];

  constructor() {
    this.endpoint = "https://pulsedive.com";
    this.name = "Pulsedive";
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
  public searchByHash(query) {
    return this.search(query);
  }

  private search(query: string) {
    const wordArray = crypto.enc.Utf8.parse(query);
    const b64 = crypto.enc.Base64.stringify(wordArray);
    return `${this.endpoint}/indicator/?ioc=${b64}`;
  }
}
