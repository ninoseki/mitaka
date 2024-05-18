import { errAsync, ResultAsync } from "neverthrow";
import { z } from "zod";

import type { ScannableType } from "~/types";

import { Base } from "./base";

const Response = z.object({
  sha256: z.string(),
});

const ErrorResponse = z.object({
  message: z.string(),
});

export class HybridAnalysis extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];
  public apiKey?: string = undefined;

  public constructor() {
    super();
    this.baseURL = "https://www.hybrid-analysis.com";
    this.name = "HybridAnalysis";
  }

  setAPIKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  scanByURL(url: string) {
    if (!this.apiKey) {
      return errAsync("Please set your HybridAnalysis API key via the option.");
    }

    const formData = new FormData();
    formData.append("scan_type", "all");
    formData.append("url", url);

    const headers = {
      "api-key": this.apiKey,
      "user-agent": "Falcon Sandbox",
    };

    const scan = async () => {
      const res = await fetch(`${this.baseURL}/api/v2/quick-scan/url`, {
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
    };

    return ResultAsync.fromThrowable(
      scan,
      (err: unknown) => (err as Error).message,
    )();
  }
}
