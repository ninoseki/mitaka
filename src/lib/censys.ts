import { Searcher } from './searcher';

export class Censys extends Searcher {

  protected endpoint: string;

  constructor() {
    super();
    this.endpoint = 'https://censys.io';
  }

  public searchUrl(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/ipv4?q=${encoded}`;
  }
}
