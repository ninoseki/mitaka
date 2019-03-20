import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class PubDB implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["gaTrackID", "gaPubID"];

  public constructor() {
    this.endpoint = "http://pub-db.com";
    this.name = "PubDB";
  }

  public searchByGATrackID(query: string): string {
    return buildURL(this.endpoint, `/google-analytics/${query}.html`);
  }

  public searchByGAPubID(query: string): string {
    return buildURL(this.endpoint, `/adsense/${query}.html`);
  }
}
