import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class Crtsh extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['domain']

  public constructor() {
    super()
    this.baseURL = 'https://crt.sh'
    this.name = 'crt.sh'
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, '/', { q: query }))
  }
}
