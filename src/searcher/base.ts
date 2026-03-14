import { err, Result } from 'neverthrow'

import type { SearchableType } from '~/schemas'
import type { Searcher } from '~/types'

export class Base implements Searcher {
  public baseURL: string
  public name: string
  public supportedTypes: SearchableType[] = []

  public constructor() {
    this.baseURL = 'http://example.com'
    this.name = 'Base'
  }

  public searchByASN(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByBTC(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByCVE(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByDomain(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByEmail(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByETH(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByGAPubID(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByGATrackID(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByHash(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByIP(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByURL(_query: string): Result<string, string> {
    return err('Not Implemented')
  }

  public searchByXMR(_query: string): Result<string, string> {
    return err('Not Implemented')
  }
}
