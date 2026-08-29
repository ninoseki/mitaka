import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class OCCRP extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['email']

  public constructor() {
    super()
    this.baseURL = 'https://data.occrp.org'
    this.name = 'OCCPR'
  }

  public override searchByEmail(query: string) {
    return ok(
      buildURL(this.baseURL, '/search', {
        facet: 'email',
        'filter:emails': query,
      }),
    )
  }
}
