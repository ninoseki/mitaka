import { SearcherResult, Selector } from './selector';

export class Command {
  public action: string;
  public parts: string[];
  public query: string;
  public target: string;

  constructor(command: string) {
    this.parts = command.split(' ');
    this.action = this.parts[0].toLowerCase();
    this.query = this.parts.slice(1, this.parts.length - 5).join(' ');
    this.target = this.parts[this.parts.length - 1];
  }

  public search(): string {
    const selector: Selector = new Selector(this.query);
    const results: SearcherResult[] = selector.getSearcherResults();
    const result = results.find((r) => r.searcher.name === this.target);
    let target = '';
    if (result !== undefined) {
      switch (result.type) {
        case 'text':
          target = result.searcher.searchByText!(result.query);
          break;
        case 'ip':
          target = result.searcher.searchByIP!(result.query);
          break;
        case 'domain':
          target = result.searcher.searchByDomain!(result.query);
          break;
        case 'url':
          target = result.searcher.searchByURL!(result.query);
          break;
        case 'hash':
          target = result.searcher.searchByHash!(result.query);
          break;
      }
    }
    return target;
  }
}
