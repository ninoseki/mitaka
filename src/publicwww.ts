export class PublicWWW {

  protected query: string;
  protected endpoint: string;

  constructor(query) {
    this.query = query;
    this.endpoint = 'https://publicwww.com/websites';
  }

  public searchUrl() {
    const encoded = encodeURIComponent(this.query);
    return `${this.endpoint}/${encoded}`;
  }
}
