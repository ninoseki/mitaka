import axios, { AxiosError } from "axios";

import { ScannableType, Scanner } from "@/types";

interface Response {
  result: string;
}

interface ErrorResponse {
  message: string;
  description: string;
  status: number;
}

export class Urlscan implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["ip", "domain", "url"];
  protected apiKey: string | undefined;

  public constructor() {
    this.baseURL = "https://urlscan.io/api/v1";
    this.name = "urlscan.io";
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

    try {
      const res = await axios.post<Response>(
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
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw Error(error.response?.data.description);
    }
  }
}
