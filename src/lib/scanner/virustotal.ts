import axios from "axios";
import * as qs from "qs";
import { ScannableType, Scanner } from "./scanner";

export class VirusTotal implements Scanner {

  endpoint: string;
  name: string;
  supportedTypes: ScannableType[] = ["url"];
  protected apiKey: string | undefined;

  constructor() {
    this.endpoint = "https://www.virustotal.com/vtapi/v2";
    this.name = "VirusTotal";
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async scanByURL(url) {
    if (this.apiKey === undefined) {
      throw Error("Please set your VirusTotal API key via the option.");
    }

    const params = {
      apikey: this.apiKey,
      url,
    };

    const res = await axios.post(`${this.endpoint}/url/scan`, qs.stringify(params));
    return res.data.permalink;
  }
}
