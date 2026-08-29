import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class IPinfo extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'asn']

  public constructor() {
    super()
    this.baseURL = 'https://ipinfo.io'
    this.name = 'IPinfo'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`))
  }

  public override searchByASN(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`))
  }
}
