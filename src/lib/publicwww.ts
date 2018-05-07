import { Searcher } from './searcher';

export class PublicWWW extends Searcher {

  protected endpoint: string;

  constructor() {
    super();
    this.endpoint = 'https://publicwww.com/websites';
  }

  public searchUrl(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/${encoded}`;
  }
}
