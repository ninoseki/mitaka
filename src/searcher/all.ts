import type { SearchableType } from '~/schemas'

import { Base } from './base'

export class All extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: SearchableType[] = []

  public constructor() {
    super()
    this.baseURL = 'https://example.com'
    this.name = 'all'
  }
}
