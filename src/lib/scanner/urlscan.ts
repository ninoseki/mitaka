import axios from "axios";
import { Scanner, ScannableType } from "../types";

export class Urlscan implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["ip", "domain", "url"];
  protected apiKey: string | undefined;

  public constructor() {
    this.baseURL = "https://urlscan.io/api/v1";
    this.name = "Urlscan";
  }

  public setApiKey(apiKey: string | undefined): void {
    this.apiKey = apiKey;
  }

  public async scanByIP(ip: string): Promise<string> {
    return await this.scan(ip);
  }

  public async scanByDomain(domain: string): Promise<string> {
    return await this.scan(domain);
  }

  public async scanByURL(url: string): Promise<string> {
    return await this.scan(url);
  }

  private async scan(query: string, isPublic = true): Promise<string> {
    if (this.apiKey === undefined) {
      throw Error("Please set your urlscan.io API key via the option.");
    }

    const res = await axios.post(
      `${this.baseURL}/scan/`,
      {
        public: isPublic ? "on" : "off",
        url: query,
      },
      {
        headers: {
          "API-KEY": this.apiKey,
        },
      }
    );
    // ref. https://github.com/ninoseki/mitaka/issues/97
    return `${res.data.result}loading`;
  }
}
