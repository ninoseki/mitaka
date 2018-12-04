import { SearchableType, Searcher } from "./searcher";

export class PubDB implements Searcher {

  endpoint: string;
  name;
  supportedTypes: SearchableType[] = ["gaTrackID", "gaPubID"];

  constructor() {
    this.endpoint = "http://pub-db.com";
    this.name = "PubDB";
  }

  searchByGATrackID(query) {
    return `${this.endpoint}/google-analytics/${query}.html`;
  }

  searchByGAPubID(query) {
    return `${this.endpoint}/adsense/${query}.html`;
  }
}
