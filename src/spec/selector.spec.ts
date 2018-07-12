import { expect } from 'chai';
import 'mocha';
import { SearcherResult, Selector } from '../lib/selector';

describe('Seletor', () => {
  context('ip', () => {
    const selector: Selector = new Selector('text');
    describe('#getSearchersForRaw', () => {
      it('should return Searchers support text', () => {
        expect(selector.getSearchersForText().length).to.equal(3);
      });
    });
    describe('#getSearcherResults', () => {
      it('should return Searchers support text', () => {
        const results: SearcherResult[] = selector.getSearcherResults();
        for (const result of results) {
          expect(result.query).to.equal('text');
        }
        expect(results.length).to.equal(3); // censys, shodan, publicwww
      });
    });
  });

  context('ip', () => {
    const selector: Selector = new Selector('8.8.8.8');
    describe('#getIP', () => {
      it('should return the ip', () => {
        expect(selector.getIP()).to.equal('8.8.8.8');
      });
    });
    describe('#getSearchersForIP', () => {
      it('should return Searchers support IP', () => {
        expect(selector.getSearchersForDomain().length).to.equal(2);
      });
    });
    describe('#getSearchers', () => {
      it('should return SearchrerResults support domain', () => {
        const results: SearcherResult[] = selector.getSearcherResults();
        for (const result of results) {
          expect(result.query).to.equal('8.8.8.8');
        }
        expect(results.length).to.equal(5); // urlscan, virustotal + text(3)
      });
    });
  });

  context('domain', () => {
    const selector: Selector = new Selector('urlscan.io');
    describe('#getDomain', () => {
      it('should return the domain', () => {
        expect(selector.getDomain()).to.equal('urlscan.io');
      });
    });
    describe('#getSearchersForDomain', () => {
      it('should return Searchers support domain', () => {
        expect(selector.getSearchersForDomain().length).to.equal(2);
      });
    });
    describe('#getSearchers', () => {
      it('should return SearchrerResults support domain', () => {
        const results: SearcherResult[] = selector.getSearcherResults();
        for (const result of results) {
          expect(result.query).to.equal('urlscan.io');
        }
        expect(results.length).to.equal(5); // urlscan, virustotal + text(3)
      });
    });
  });

  context('url', () => {
    const selector: Selector = new Selector('https://urlscan.io/');
    describe('#getUrl', () => {
      it('should return the domain', () => {
        expect(selector.getUrl()).to.equal('https://urlscan.io/');
      });
    });
    describe('#getSearchersForUrl', () => {
      it('should return Searchers support url', () => {
        expect(selector.getSearchersForUrl().length).to.equal(2);
      });
    });
    describe('#getSearchers', () => {
      it('should return SearchrerResults support url', () => {
        const results: SearcherResult[] = selector.getSearcherResults();
        for (const result of results) {
          expect(result.query).to.equal('https://urlscan.io/');
        }
        expect(results.length).to.equal(5); // urlscan, virustotal + text(3)
      });
    });
  });

  context('hash', () => {
    const selector: Selector = new Selector('f6f8179ac71eaabff12b8c024342109b');
    describe('#getUrl', () => {
      it('should return the domain', () => {
        expect(selector.getHash()).to.equal('f6f8179ac71eaabff12b8c024342109b');
      });
    });
    describe('#getSearchersForHash', () => {
      it('should return Searchers support hash', () => {
        expect(selector.getSearchersForHash().length).to.equal(1);
      });
    });
    describe('#getSearchers', () => {
      it('should return SearchrerResults support url', () => {
        const results: SearcherResult[] = selector.getSearcherResults();
        for (const result of results) {
          expect(result.query).to.equal('f6f8179ac71eaabff12b8c024342109b');
        }
        expect(results.length).to.equal(4); // virustotal + text(3)
      });
    });
  });
});
