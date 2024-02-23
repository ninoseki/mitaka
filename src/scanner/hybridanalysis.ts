import { err, ok, Result } from "neverthrow";
import { z } from "zod";

import type { ScannableType, Scanner } from "~/types";

const Response = z.object({
  sha256: z.string(),
});

const ErrorResponse = z.object({
  message: z.string(),
});

export class HybridAnalysis implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];
  public apiKey: string | undefined;
  public hasAPIKey = true;

  public constructor() {
    this.baseURL = "https://www.hybrid-analysis.com";
    this.name = "HybridAnalysis";
  }

  public setAPIKey(apiKey: string | undefined): void {
    this.apiKey = apiKey;
  }

  public async scanByURL(url: string): Promise<Result<string, string>> {
    if (this.apiKey === undefined) {
      return err("Please set your HybridAnalysis API key via the option.");
    }

    const formData = new FormData();
    formData.append("scan_type", "all");
    formData.append("url", url);

    const headers = {
      "api-key": this.apiKey,
      "user-agent": "Falcon Sandbox",
    };

    const res = await fetch(`${this.baseURL}/api/v2/quick-scan/url`, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      const parsed = ErrorResponse.parse(data);
      return err(parsed.message);
    }

    const parsed = Response.parse(data);
    const sha256: string = parsed.sha256;
    return ok(`https://www.hybrid-analysis.com/sample/${sha256}/`);
  }
}
