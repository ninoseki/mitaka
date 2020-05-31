import axios from "axios";
import qs from "qs";
import snakecaseKeys from "snakecase-keys";

import { ScannableType, Scanner } from "../types";

interface Resopnse {
  sha256: string;
}

export class HybridAnalysis implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];
  protected apiKey: string | undefined;

  public constructor() {
    this.baseURL = "https://www.hybrid-analysis.com/api/v2";
    this.name = "HybridAnalysis";
  }

  public setApiKey(apiKey: string | undefined): void {
    this.apiKey = apiKey;
  }

  public async scanByURL(url: string): Promise<string> {
    if (this.apiKey === undefined) {
      throw Error("Please set your HybridAnalysis API key via the option.");
    }

    const params = snakecaseKeys({
      scanType: "all",
      url: url,
    });
    const res = await axios.post<Resopnse>(
      `${this.baseURL}/quick-scan/url`,
      qs.stringify(params),
      {
        headers: {
          "api-key": this.apiKey,
          "user-agent": "Falcon Sandbox",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const sha256: string = res.data.sha256;
    return `https://www.hybrid-analysis.com/sample/${sha256}/`;
  }
}
