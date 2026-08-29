import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class AbuseIPDB extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip']

  public constructor() {
    super()
    this.baseURL = 'https://www.abuseipdb.com'
    this.name = 'AbuseIPDB'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/check/${query}`))
  }
}
