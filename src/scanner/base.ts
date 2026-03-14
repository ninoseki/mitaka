import { errAsync, ResultAsync } from 'neverthrow'

import type { ScannableType, Scanner } from '~/types'

export class Base implements Scanner {
  public baseURL: string
  public name: string
  public supportedTypes: ScannableType[] = []
  public apiKey?: string = undefined
  public apiKeyRequired: boolean = true

  public constructor() {
    this.baseURL = 'http://example.com'
    this.name = 'Base'
  }

  public setAPIKey(apiKey?: string): void {
    this.apiKey = apiKey
  }

  public scanByURL(_url: string): ResultAsync<string, string> {
    return errAsync('Not implemented')
  }

  public scanByIP(_url: string): ResultAsync<string, string> {
    return errAsync('Not implemented')
  }

  public scanByDomain(_url: string): ResultAsync<string, string> {
    return errAsync('Not implemented')
  }
}
