import { Searcher } from './searcher';

export class Shodan implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ['raw'];

  constructor() {
    this.endpoint = `https://www.shodan.io`;
    this.name = 'Shodan';
  }

  public searchByRaw(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/search?query=${encoded}`;
  }
}
