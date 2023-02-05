import type { ScannableType, Scanner } from "@/types";
import { z } from "zod";

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
  protected apiKey: string | undefined;

  public constructor() {
    this.baseURL = "https://www.hybrid-analysis.com/api/v2";
    this.name = "HybridAnalysis";
  }

  public setAPIKey(apiKey: string | undefined): void {
    this.apiKey = apiKey;
  }

  public async scanByURL(url: string): Promise<string> {
    if (this.apiKey === undefined) {
      throw Error("Please set your HybridAnalysis API key via the option.");
    }

    const formData = new FormData();
    formData.append("scan_type", "all");
    formData.append("url", url);

    const headers = {
      "api-key": this.apiKey,
      "user-agent": "Falcon Sandbox",
    };

    const res = await fetch(`${this.baseURL}/quick-scan/url`, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      const parsed = ErrorResponse.parse(data);
      throw Error(parsed.message);
    }

    const parsed = Response.parse(data);
    const sha256: string = parsed.sha256;
    return `https://www.hybrid-analysis.com/sample/${sha256}/`;
  }
}
