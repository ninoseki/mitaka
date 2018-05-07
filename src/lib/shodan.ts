import { Searcher } from './searcher';

export class Shodan extends Searcher {

  protected endpoint: string;

  constructor() {
    super();
    this.endpoint = `https://www.shodan.io`;
  }

  public searchUrl(query) {
    const encoded = encodeURIComponent(query);
    return `${this.endpoint}/search?query=${encoded}`;
  }
}
