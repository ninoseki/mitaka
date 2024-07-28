import { errAsync, ResultAsync } from "neverthrow";
import * as v from "valibot";

import type { urlscanVisibilityType } from "~/schemas";
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
  public visibility: urlscanVisibilityType = "public";

  public constructor() {
    super();
    this.baseURL = "https://urlscan.io";
    this.name = "urlscan.io";
  }

  public setAPIKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  public setVisibility(visibility: urlscanVisibilityType): void {
    this.visibility = visibility;
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

  private scan(query: string) {
    if (!this.apiKey) {
      return errAsync("Please set your urlscan.io API key via the option.");
    }

    const scan = async () => {
      const res = await fetch(`${this.baseURL}/api/v1/scan/`, {
        method: "POST",
        headers: {
          "API-KEY": this.apiKey!,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          visibility: this.visibility,
          url: query,
        }),
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
