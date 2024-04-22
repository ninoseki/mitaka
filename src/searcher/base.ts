import { err, Result } from "neverthrow";

import type { SearchableType } from "~/schemas";
import type { Searcher } from "~/types";

export class Base implements Searcher {
  public baseURL: string;
  public name: string;
  public supportedTypes: SearchableType[] = [];

  public constructor() {
    this.baseURL = "http://example.com";
    this.name = "Base";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByASN(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByBTC(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByCVE(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByDomain(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByEmail(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByETH(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByGAPubID(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByGATrackID(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByHash(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByIP(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByURL(query: string): Result<string, string> {
    return err("Not Implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public searchByXMR(query: string): Result<string, string> {
    return err("Not Implemented");
  }
}
