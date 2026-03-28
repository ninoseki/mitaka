import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class SpyOnWeb extends Base {
  public baseURL: string
  public name: string
  public supportedTypes: SearchableType[] = ['ip', 'domain', 'gaPubID', 'gaTrackID']

  public constructor() {
    super()
    this.baseURL = 'http://spyonweb.net'
    this.name = 'SpyOnWeb'
  }

  public searchByIP(query: string) {
    return this.search('ip', query)
  }

  public searchByDomain(query: string) {
    return this.search('domain', query)
  }

  public searchByGAPubID(query: string) {
    return this.search('adsense', query)
  }

  public searchByGATrackID(query: string) {
    return this.search('analytics', query)
  }

  private search(type: string, query: string) {
    return ok(buildURL(this.baseURL, `/${type}/${query}`))
  }
}
