import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class HybridAnalysis extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'hash']

  public constructor() {
    super()
    this.baseURL = 'https://www.hybrid-analysis.com'
    this.name = 'HybridAnalysis'
  }

  public override searchByHash(query: string) {
    return ok(buildURL(this.baseURL, '/search', { query: `${query}` }))
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, '/search', { query: `host:${query}` }))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, '/search', { query: `domain:${query}` }))
  }
}
