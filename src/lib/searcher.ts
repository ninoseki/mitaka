export abstract class Searcher {
  protected abstract endpoint: string;
  public abstract searchUrl(query: string): string;
}
