import { Base64 } from 'js-base64'
import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class ZoomEye extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip']

  public constructor() {
    super()
    this.baseURL = 'https://www.zoomeye.ai'
    this.name = 'ZoomEye'
  }

  public override searchByIP(query: string) {
    const encodedQuery = Base64.encode(`ip="${query}"`)
    return ok(
      buildURL(this.baseURL, '/searchResult', {
        q: encodedQuery,
      }),
    )
  }
}
