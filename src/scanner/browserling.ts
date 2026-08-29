import { okAsync } from 'neverthrow'

import type { ScannableType } from '~/types'
import { buildURL } from '~/utils'

import { Base } from './base'

export class Browserling extends Base {
  public override baseURL: string
  public override name: string
  public override supportedTypes: ScannableType[] = ['url']
  public override apiKey?: string = undefined
  public override apiKeyRequired: boolean = false

  public constructor() {
    super()
    this.baseURL = 'https://www.browserling.com'
    this.name = 'Browserling'
  }

  override scanByURL(url: string) {
    return okAsync(buildURL(this.baseURL, `/browse/win/7/ie/11/${encodeURIComponent(url)}`))
  }
}
