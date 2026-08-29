import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class SpyOnWeb extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'gaPubID', 'gaTrackID']

  public constructor() {
    super()
    this.baseURL = 'http://spyonweb.net'
    this.name = 'SpyOnWeb'
  }

  public override searchByIP(query: string) {
    return this.search('ip', query)
  }

  public override searchByDomain(query: string) {
    return this.search('domain', query)
  }

  public override searchByGAPubID(query: string) {
    return this.search('adsense', query)
  }

  public override searchByGATrackID(query: string) {
    return this.search('analytics', query)
  }

  private search(type: string, query: string) {
    return ok(buildURL(this.baseURL, `/${type}/${query}`))
  }
}
