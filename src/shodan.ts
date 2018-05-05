export class Shodan {

  protected query: string;
  protected endpoint: string;

  constructor(query) {
    this.query = query;
    this.endpoint = `https://www.shodan.io`;
  }

  public searchUrl() {
    const encoded = encodeURIComponent(this.query);
    return `${this.endpoint}/search?query=${encoded}`;
  }
}
