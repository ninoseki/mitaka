import { errAsync, ResultAsync } from "neverthrow";
import * as v from "valibot";

import type { ScannableType } from "~/types";

import { Base } from "./base";

const Response = v.object({
  result: v.string(),
});

const ErrorResponse = v.object({
  message: v.string(),
  status: v.number(),
});

export class URLScan extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["ip", "domain", "url"];
  public apiKey?: string = undefined;

  public constructor() {
    super();
    this.baseURL = "https://urlscan.io";
    this.name = "urlscan.io";
  }

  public setAPIKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  scanByIP(ip: string) {
    return this.scan(ip);
  }

  scanByDomain(domain: string) {
    return this.scan(domain);
  }

  scanByURL(url: string) {
    return this.scan(url);
  }

  private scan(query: string, isPublic = true) {
    if (!this.apiKey) {
      return errAsync("Please set your urlscan.io API key via the option.");
    }

    const body = JSON.stringify({
      public: isPublic ? "on" : "off",
      url: query,
    });
    const headers = {
      "API-KEY": this.apiKey,
      "content-type": "application/json",
    };

    const scan = async () => {
      const res = await fetch(`${this.baseURL}/api/v1/scan/`, {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        const parsed = v.parse(ErrorResponse, data);
        throw new Error(parsed.message);
      }

      const parsed = v.parse(Response, data);
      return `${parsed.result}loading`;
    };

    return ResultAsync.fromThrowable(
      scan,
      (err: unknown) => (err as Error).message,
    )();
  }
}
