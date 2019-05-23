import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class EmailRep implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["email"];

  public constructor() {
    this.endpoint = "https://emailrep.io";
    this.name = "EmailRep";
  }

  public searchByEmail(query: string): string {
    return buildURL(this.endpoint, `/${query}`);
  }
}
