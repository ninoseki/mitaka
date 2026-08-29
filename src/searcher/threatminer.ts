import { ok } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import { buildURL } from '~/utils'

import { Base } from './base'

export class ThreatMiner extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = ['ip', 'domain', 'hash']

  public constructor() {
    super()
    this.baseURL = 'https://www.threatminer.org'
    this.name = 'ThreatMiner'
  }

  public override searchByIP(query: string) {
    return ok(buildURL(this.baseURL, '/host.php', { q: query }))
  }

  public override searchByDomain(query: string) {
    return ok(buildURL(this.baseURL, '/domain.php', { q: query }))
  }

  public override searchByHash(query: string) {
    return ok(buildURL(this.baseURL, '/sample.php', { q: query }))
  }
}
