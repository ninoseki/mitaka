import { z } from "zod";

import type { ScannableType, Scanner } from "~/types";

const Response = z.object({
  result: z.string(),
});

const ErrorResponse = z.object({
  message: z.string(),
  description: z.string(),
  status: z.number(),
});

export class URLScan implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["ip", "domain", "url"];
  protected apiKey: string | undefined;

  public constructor() {
    this.baseURL = "https://urlscan.io/api/v1";
    this.name = "urlscan.io";
  }

  public setAPIKey(apiKey: string | undefined): void {
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

    const body = JSON.stringify({
      public: isPublic ? "on" : "off",
      url: query,
    });
    const headers = {
      "API-KEY": this.apiKey,
      "content-type": "application/json",
    };

    const res = await fetch(`${this.baseURL}/scan/`, {
      method: "POST",
      headers,
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      const parsed = ErrorResponse.parse(data);
      throw Error(parsed.message);
    }

    const parsed = Response.parse(data);
    return `${parsed.result}loading`;
  }
}
