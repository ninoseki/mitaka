import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'

import { Base } from './base'

export class AnyRun extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['hash']

  public constructor() {
    super()
    this.baseURL = 'https://app.any.run'
    this.name = 'ANY.RUN'
  }

  public override searchByHash(query: string) {
    return ok(this.baseURL + `/submissions/#filehash:${query}`)
  }
}
