import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { base64fy } from '~/utils'

import { Base } from './base'

export class Pulsedive extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'url', 'hash']

  public constructor() {
    super()
    this.baseURL = 'https://pulsedive.com'
    this.name = 'Pulsedive'
  }

  public override searchByIP(query: string) {
    return this.search(query)
  }
  public override searchByDomain(query: string) {
    return this.search(query)
  }
  public override searchByURL(query: string) {
    return this.search(query)
  }
  public override searchByHash(query: string) {
    return this.search(query)
  }

  private search(query: string) {
    return ok(`${this.baseURL}/indicator/?ioc=${base64fy(query)}`)
  }
}
