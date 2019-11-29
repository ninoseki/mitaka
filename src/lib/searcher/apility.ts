import { buildURL } from "../url_builder";
import { Searcher, SearchableType } from "../types";
import { extractASNumber } from "../utility";

export class Apility implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "email", "asn"];

  public constructor() {
    this.baseURL = "https://apility.io";
    this.name = "Apility";
  }

  public searchByIP(query: string): string {
    return this.search(query);
  }

  public searchByDomain(query: string): string {
    return this.search(query);
  }

  public searchByEmail(query: string): string {
    return this.search(query);
  }

  public searchByASN(query: string): string {
    const number: string = extractASNumber(query);
    console.log(number);
    return this.search(number);
  }

  private search(query: string): string {
    return buildURL(this.baseURL, `/search/${query}`);
  }
}
