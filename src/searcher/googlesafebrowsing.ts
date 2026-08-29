import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class GoogleSafeBrowsing extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['domain', 'url']

  public constructor() {
    super()
    this.baseURL = 'https://transparencyreport.google.com'
    this.name = 'GoogleSafeBrowsing'
  }

  public override searchByDomain(query: string) {
    return this.search(query)
  }

  public override searchByURL(query: string) {
    return this.search(query)
  }

  private search(query: string) {
    return ok(buildURL(this.baseURL, '/safe-browsing/search', { url: query }))
  }
}
