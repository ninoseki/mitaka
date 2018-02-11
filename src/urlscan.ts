import axios from 'axios'

export class Urlscan {

  protected apiKey: string
  protected endpoint: string

  constructor(apiKey) {
    this.apiKey = apiKey
    this.endpoint = "https://urlscan.io/api/v1"
  }

  async submit(url, isPublic = true) {
    let res = await axios.post(`${this.endpoint}/scan/`, {
      url: url,
      public: isPublic ? "on" : "off"
    }, {
      headers: {
        "API-KEY": this.apiKey
      }
    })
    return res
  }
}
