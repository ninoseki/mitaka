import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class XForceExchange extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'hash']

  public constructor() {
    super()
    this.baseURL = 'https://exchange.xforce.ibmcloud.com'
    this.name = 'X-Force-Exchange'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/url/${query}`))
  }

  public override searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/malware/${query}`))
  }
}
