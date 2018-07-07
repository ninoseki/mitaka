import { Searcher } from './searcher';

export class PublicWWW implements Searcher {

  public endpoint: string;
  public supportedTypes: string[] = ['raw'];

  constructor() {
    this.endpoint = 'https://publicwww.com/websites';
  }

  public searchByRaw(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/${encoded}`;
  }
}
