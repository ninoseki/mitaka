import type { ScannableType, Scanner } from "@/types";
import { buildURL } from "@/utils";

export class Browserling implements Scanner {
  public baseURL: string;
  public name: string;
  public supportedTypes: ScannableType[] = ["url"];

  public constructor() {
    this.baseURL = "https://www.browserling.com";
    this.name = "Browserling";
  }

  public scanByURL(url: string): string {
    return buildURL(
      this.baseURL,
      `/browse/win/7/ie/11/${encodeURIComponent(url)}`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setAPIKey(_: string | undefined): void {
    return;
  }
}
