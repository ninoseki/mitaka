import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class ThreatBook extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain']

  public constructor() {
    super()
    this.baseURL = 'https://threatbook.io'
    this.name = 'ThreatBook'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/domain/${query}`))
  }
}
