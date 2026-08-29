import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class ArchiveOrg extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['url']

  public constructor() {
    super()
    this.baseURL = 'https://web.archive.org'
    this.name = 'archive.org'
  }

  public override searchByURL(query: string) {
    return ok(buildURL(this.baseURL, `/web/*/${query}`))
  }
}
