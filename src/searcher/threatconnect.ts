import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class ThreatConnect extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'email']

  public constructor() {
    super()
    this.baseURL = 'https://app.threatconnect.com'
    this.name = 'ThreatConnect'
  }

  public override searchByIP(query: string) {
    return this.searchByType('address', query)
  }

  public override searchByDomain(query: string) {
    return this.searchByType('host', query)
  }

  public override searchByEmail(query: string) {
    return this.searchByType('emailaddress', query)
  }

  private searchByType(type: string, query: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = {}
    params[type] = query

    return ok(buildURL(this.baseURL, `/auth/indicators/details/${type}.xhtml`, params))
  }
}
