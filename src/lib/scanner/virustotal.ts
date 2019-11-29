import axios from "axios";
import * as qs from "qs";
import { Scanner, ScannableType } from "../types";

export class VirusTotal implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];
  protected apiKey: string | undefined;

  public constructor() {
    this.baseURL = "https://www.virustotal.com/vtapi/v2";
    this.name = "VirusTotal";
  }

  public setApiKey(apiKey: string | undefined): void {
    this.apiKey = apiKey;
  }

  public async scanByURL(url: string): Promise<string> {
    if (this.apiKey === undefined) {
      throw Error("Please set your VirusTotal API key via the option.");
    }

    const params = {
      apikey: this.apiKey,
      url,
    };

    const res = await axios.post(
      `${this.baseURL}/url/scan`,
      qs.stringify(params)
    );
    return res.data.permalink;
  }
}
