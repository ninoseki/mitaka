import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class FortiGuard extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'url', 'cve']

  public constructor() {
    super()
    this.baseURL = 'https://fortiguard.com'
    this.name = 'FortiGuard'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, '/search', { q: query, engine: 7 }))
  }

  public override searchByURL(query: string) {
    return ok(buildURL(this.baseURL, '/search', { q: query, engine: 7 }))
  }

  public override searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, '/search', { q: query, engine: 3 }))
  }
}
