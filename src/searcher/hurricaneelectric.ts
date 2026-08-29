import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL, extractASNumber } from '~/utils'

import { Base } from './base'

export class HurricaneElectric extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'asn']

  public constructor() {
    super()
    this.baseURL = 'https://bgp.he.net'
    this.name = 'HurricaneElectric'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/dns/${query}`))
  }

  public override searchByASN(query: string) {
    const asn = extractASNumber(query)
    return ok(buildURL(this.baseURL, `/AS${asn}`))
  }
}
