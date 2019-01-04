import axios from "axios";
import { ScannableType, Scanner } from "./scanner";

export class Urlscan implements Scanner {
  public endpoint: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["ip", "domain", "url"];
  protected apiKey: string | undefined;

  constructor() {
    this.endpoint = "https://urlscan.io/api/v1";
    this.name = "Urlscan";
  }

  public setApiKey(apiKey: string | undefined) {
    this.apiKey = apiKey;
  }

  public async scanByIP(ip: string) {
    return await this.scan(ip);
  }

  public async scanByDomain(domain: string) {
    return await this.scan(domain);
  }

  public async scanByURL(url: string) {
    return await this.scan(url);
  }

  private async scan(query: string, isPublic = true) {
    if (this.apiKey === undefined) {
      throw Error("Please set your urlscan.io API key via the option.");
    }

    const res = await axios.post(`${this.endpoint}/scan/`, {
      public: isPublic ? "on" : "off",
      url: query,
    }, {
        headers: {
          "API-KEY": this.apiKey,
        },
      });
    // ref. https://github.com/ninoseki/mitaka/issues/97
    return `${res.data.result}loading`;
  }
}
