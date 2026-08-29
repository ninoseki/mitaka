import { err, ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class VMRay extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['hash']

  public constructor() {
    super()
    this.baseURL = 'https://www.vmray.com'
    this.name = 'VMRay'
  }

  public override searchByHash(query: string) {
    if (query.length !== 64) {
      return err('VMRay supports SHA256 hash only')
    }
    const trimmed = query.substring(0, 12)
    return ok(buildURL(this.baseURL, `/analyses/${trimmed}/report/overview.html`))
  }
}
