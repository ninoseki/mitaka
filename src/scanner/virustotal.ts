import { z } from "zod";

import type { ScannableType, Scanner } from "@/types";
import { buildURL } from "@/utils";

const Data = z.object({
  id: z.string(),
  type: z.string(),
});

const Response = z.object({
  data: Data,
});

const ErrorMessage = z.object({
  message: z.string(),
});

const ErrorResponse = z.object({
  error: ErrorMessage,
});

export class VirusTotal implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];
  protected apiKey: string | undefined;

  public constructor() {
    this.baseURL = "https://www.virustotal.com/api/v3";
    this.name = "VirusTotal";
  }

  public setAPIKey(apiKey: string | undefined): void {
    this.apiKey = apiKey;
  }

  private permaLink(id: string): string {
    // id format: u-{SHA256}-{?}
    // e.g. u-ef8678c0f43f6142407ca89b4a376556cd4472d26b5952efa6d3821fa9fc597b-1589690619
    const parts = id.split("-");
    const sha256 = parts[1];
    return buildURL("https://www.virustotal.com", `/gui/url/${sha256}/details`);
  }

  public async scanByURL(url: string): Promise<string> {
    if (this.apiKey === undefined) {
      throw Error("Please set your VirusTotal API key via the option.");
    }

    const formData = new FormData();
    formData.append("url", url);

    const headers = {
      "x-apikey": this.apiKey,
    };

    const res = await fetch(buildURL(this.baseURL, "/urls"), {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      const parsed = ErrorResponse.parse(data);
      throw Error(parsed.error.message);
    }

    const parsed = Response.parse(data);
    return this.permaLink(parsed.data.id);
  }
}
