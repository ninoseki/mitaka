import axios from 'axios';

export class Urlscan {

  protected apiKey: string;
  protected endpoint: string;

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = 'https://urlscan.io/api/v1';
  }

  public async submit(url, isPublic = true) {
    const res = await axios.post(`${this.endpoint}/scan/`, {
      public: isPublic ? 'on' : 'off',
      url,
    }, {
        headers: {
          'API-KEY': this.apiKey,
        },
      });
    return res;
  }
}
