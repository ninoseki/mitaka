import axios from "axios";
import { Scanner } from "./scanner";

export class VirusTotalScanner implements Scanner {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ["url"];
  protected apiKey: string | undefined;

  constructor() {
    this.endpoint = "https://www.virustotal.com";
    this.name = "VirusTotal";
  }

  public setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  public async scanByURL(url) {
    if (this.apiKey === undefined) {
      throw Error("Please set your VirusTotal API key via the option.");
    }

    const res = await axios.post(`${this.endpoint}/vtapi/v2/url/scan`, {
      apikey: this.apiKey,
      url,
    });
    return res.data.permalink;
  }
}
