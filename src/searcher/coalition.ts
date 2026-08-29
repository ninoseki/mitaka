import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class Coalition extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['cve']

  public constructor() {
    super()
    this.baseURL = 'https://ess.coalitioninc.com'
    this.name = 'Coalition'
  }

  public override searchByCVE(query: string) {
    return ok(buildURL(this.baseURL, '/cve/', { id: query }))
  }
}
