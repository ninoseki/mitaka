import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class Shodan extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'asn']

  public constructor() {
    super()
    this.baseURL = `https://www.shodan.io`
    this.name = 'Shodan'
  }

  public override searchByASN(query: string) {
    return ok(buildURL(this.baseURL, '/search', { query: `asn:${query}` }))
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/host/${query}`))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, '/search', { query: `hostname:${query}` }))
  }
}
