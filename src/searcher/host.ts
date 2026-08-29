import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class Host extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['domain']

  public constructor() {
    super()
    this.baseURL = 'https://host.io'
    this.name = 'host.io'
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`))
  }
}
