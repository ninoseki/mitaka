import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class DNSCoffee extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['domain']

  public constructor() {
    super()
    this.baseURL = 'https://dns.coffee'
    this.name = 'DNS Coffee'
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/domains/${query}`))
  }
}
