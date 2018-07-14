import { Searcher } from './searcher';

export class HybridAnalysis implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: string[] = ['hash'];

  constructor() {
    this.endpoint = 'https://www.hybrid-analysis.com';
    this.name = 'HybridAnalysis';
  }

  public searchByHash(query) {
    if (query.length !== 64) {
      throw new Error('HybridAnalysis onlys suports SHA256');
    }
    return `${this.endpoint}/sample/${query}`;
  }
}
