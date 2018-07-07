import { Searcher } from './searcher';

export class Shodan implements Searcher {

  public endpoint: string;
  public supportedTypes: string[] = ['raw'];

  constructor() {
    this.endpoint = `https://www.shodan.io`;
  }

  public searchByRaw(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/search?query=${encoded}`;
  }
}
