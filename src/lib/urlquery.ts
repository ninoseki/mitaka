import { Searcher } from './searcher';

export class Urlquery extends Searcher {

  protected endpoint: string;

  constructor() {
    super();
    this.endpoint = 'https://urlquery.net';
  }

  public searchUrl(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/search?q=${encoded}`;
  }
}
