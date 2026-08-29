import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL, extractASNumber } from '~/utils'

import { Base } from './base'

export class URLScan extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'asn', 'url']

  public constructor() {
    super()
    this.baseURL = 'https://urlscan.io'
    this.name = 'urlscan.io'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, `/ip/${query}`))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, `/domain/${query}`))
  }

  public override searchByASN(query: string) {
    const number: string = extractASNumber(query)
    return ok(buildURL(this.baseURL, `/asn/AS${number}`))
  }

  public override searchByURL(query: string) {
    return ok(
      buildURL(
        this.baseURL,
        `/search/#${encodeURIComponent(`page.url:"${query}" OR task.url:"${query}"`)}`,
      ),
    )
  }
}
