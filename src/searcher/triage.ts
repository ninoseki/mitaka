import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class Triage extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['hash', 'url']

  public constructor() {
    super()
    this.baseURL = 'https://tria.ge'
    this.name = 'Triage'
  }

  public override searchByHash(query: string) {
    return ok(buildURL(this.baseURL, '/s', { q: query }))
  }

  public override searchByURL(query: string) {
    return ok(buildURL(this.baseURL, '/s', { q: `url:${query}` }))
  }
}
