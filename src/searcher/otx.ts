import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class OTX extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'url', 'hash', 'cve']

  public constructor() {
    super()
    this.baseURL = 'https://otx.alienvault.com'
    this.name = 'OTX'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/ip/${query}`))
  }

  public override searchByURL(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/url/${query}`))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/domain/${query}`))
  }

  public override searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/file/${query}`))
  }

  public override searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, `/indicator/cve/${query}`))
  }
}
