export class Urlquery {

  protected query: string;
  protected endpoint: string;

  constructor(query) {
    this.query = query;
    this.endpoint = 'https://urlquery.net';
  }

  public search_url() {
    const encoded = encodeURIComponent(this.query);
    return `${this.endpoint}/search?q=${encoded}`;
  }
}
