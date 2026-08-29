import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class URLhaus extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain']

  public constructor() {
    super()
    this.baseURL = 'https://urlhaus.abuse.ch'
    this.name = 'URLhaus'
  }

  public override searchByIP(query: string) {
    return this.searchByHost(query)
  }

  public override searchByDomain(query: string) {
    return this.searchByHost(query)
  }

  private searchByHost(host: string) {
    return ok(buildURL(this.baseURL, `/host/${host}/`))
  }
}
