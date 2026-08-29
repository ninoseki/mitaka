import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class WebCheck extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['domain']

  public constructor() {
    super()
    this.baseURL = 'https://web-check.xyz'
    this.name = 'WebCheck'
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/check/${query}`))
  }
}
