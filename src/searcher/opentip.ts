import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class OpenTIP extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['hash']

  public constructor() {
    super()
    this.baseURL = 'https://opentip.kaspersky.com'
    this.name = 'OpenTIP'
  }

  public override searchByHash(query: string) {
    return ok(buildURL(this.baseURL, `/${query}`))
  }
}
