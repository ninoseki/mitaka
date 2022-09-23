import axios from "axios";
import qs from "qs";

import { ScannableType, Scanner } from "@/types";
import { buildURL } from "@/urlBuilder";

interface Data {
  id: string;
  type: string;
}

interface Response {
  data: Data;
}

export class VirusTotal implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];
  protected apiKey: string | undefined;

  public constructor() {
    this.baseURL = "https://www.virustotal.com/api/v3";
    this.name = "VirusTotal";
  }

  public setApiKey(apiKey: string | undefined): void {
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

    const params = { url };
    const headers = { "x-apikey": this.apiKey };
    const res = await axios.post<Response>(
      buildURL(this.baseURL, "/urls"),
      qs.stringify(params),
      {
        headers: headers,
      }
    );
    const response = res.data;
    return this.permaLink(response.data.id);
  }
}
