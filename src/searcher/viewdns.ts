import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class ViewDNS extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'email']

  public constructor() {
    super()
    this.baseURL = 'https://viewdns.info'
    this.name = 'ViewDNS'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, '/reverseip/', { t: 1, host: query }))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, '/iphistory/', { domain: query }))
  }

  public override searchByEmail(query: string) {
    return ok(buildURL(this.baseURL, '/reversewhois/', { q: query }))
  }
}
