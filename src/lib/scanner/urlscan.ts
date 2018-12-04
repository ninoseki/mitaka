import axios from "axios";
import { ScannableType, Scanner } from "./scanner";

export class Urlscan implements Scanner {
  endpoint: string;
  name: string;
  supportedTypes: ScannableType[] = ["ip", "domain", "url"];
  protected apiKey: string | undefined;

  constructor() {
    this.endpoint = "https://urlscan.io/api/v1";
    this.name = "Urlscan";
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async scanByIP(ip) {
    return await this.scan(ip);
  }

  async scanByDomain(domain) {
    return await this.scan(domain);
  }

  async scanByURL(url) {
    return await this.scan(url);
  }

  private async scan(query, isPublic = true) {
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
