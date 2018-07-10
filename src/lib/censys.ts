import { Searcher } from './searcher';

export class Censys implements Searcher {

  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ['raw'];

  constructor() {
    this.endpoint = 'https://censys.io';
    this.name = 'Censys';
  }

  public searchByRaw(raw) {
    const encoded = encodeURIComponent(raw);
    return `${this.endpoint}/ipv4?q=${encoded}`;
  }
}
