import { SearchableType, Searcher } from "../types";
import { buildURL } from "../url_builder";

export class PubDB implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["gaTrackID", "gaPubID"];

  public constructor() {
    this.baseURL = "http://pub-db.com";
    this.name = "PubDB";
  }

  public searchByGATrackID(query: string): string {
    return buildURL(this.baseURL, `/google-analytics/${query}.html`);
  }

  public searchByGAPubID(query: string): string {
    return buildURL(this.baseURL, `/adsense/${query}.html`);
  }
}
