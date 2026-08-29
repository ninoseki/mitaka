import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class JoeSandbox extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['hash']

  public constructor() {
    super()
    this.baseURL = 'https://www.joesandbox.com'
    this.name = 'JoeSandbox'
  }

  public override searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/analysis/search`, { q: query }))
  }
}
