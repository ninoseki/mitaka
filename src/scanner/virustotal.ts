import { errAsync, ResultAsync } from "neverthrow";
import * as v from "valibot";

import type { ScannableType } from "~/types";
import { buildURL } from "~/utils";

import { Base } from "./base";

const Data = v.object({
  id: v.string(),
  type: v.string(),
});

const Response = v.object({
  data: Data,
});

const ErrorMessage = v.object({
  message: v.string(),
});

const ErrorResponse = v.object({
  error: ErrorMessage,
});

export class VirusTotal extends Base {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];
  public apiKey?: string = undefined;

  public constructor() {
    super();
    this.baseURL = "https://www.virustotal.com";
    this.name = "VirusTotal";
  }

  public setAPIKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  private permaLink(id: string): string {
    // id format: u-{SHA256}-{?}
    // e.g. u-ef8678c0f43f6142407ca89b4a376556cd4472d26b5952efa6d3821fa9fc597b-1589690619
    const parts = id.split("-");
    const sha256 = parts[1];
    return buildURL(this.baseURL, `/gui/url/${sha256}/details`);
  }

  scanByURL(url: string) {
    if (!this.apiKey) {
      return errAsync("Please set your VirusTotal API key via the option.");
    }

    const formData = new FormData();
    formData.append("url", url);

    const headers = {
      "x-apikey": this.apiKey,
    };

    const scan = async () => {
      const res = await fetch(buildURL(this.baseURL, "/api/v3/urls"), {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const parsed = v.parse(ErrorResponse, data);
        throw new Error(parsed.error.message);
      }

      const parsed = v.parse(Response, data);
      return this.permaLink(parsed.data.id);
    };

    return ResultAsync.fromThrowable(
      scan,
      (err: unknown) => (err as Error).message,
    )();
  }
}
