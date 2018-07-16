import { expect } from "chai";
import "mocha";
import { SearcherResult, Selector } from "../lib/selector";

describe("Seletor", () => {
  const stats = {
    // domainbigdata, findsubdomains, pulsedive, securitytrails, urlscan, virustotal + text(3)
    domain: 6,
    // hybridanalysis, pulsedive, virustotal
    hash: 3,
    // securitytrails, pulsedive, urlscan
    ip: 4,
    // shodan, censys, publicwww
    text: 3,
    // urlscan, pulsedive, virustotal
    url: 3,
  };

  context("searcher", () => {
    context("text", () => {
      const selector: Selector = new Selector("text");
      describe("#getSearchersForText", () => {
        it("should return Searchers support text", () => {
          expect(selector.getSearchersForText().length).to.equal(stats.text);
        });
      });
      describe("#getSearcherResults", () => {
        it("should return Searchers support text", () => {
          const results: SearcherResult[] = selector.getSearcherResults();
          for (const result of results) {
            expect(result.query).to.equal("text");
          }
          expect(results.length).to.equal(stats.text);
        });
      });
    });

    context("ip", () => {
      const selector: Selector = new Selector("8.8.8.8");
      describe("#getIP", () => {
        it("should return the ip", () => {
          expect(selector.getIP()).to.equal("8.8.8.8");
        });
      });
      describe("#getSearchersForIP", () => {
        it("should return Searchers support ip", () => {
          expect(selector.getSearchersForIP().length).to.equal(stats.ip);
        });
      });
      describe("#getSearcherResults", () => {
        it("should return SearchrerResults support ip", () => {
          const results: SearcherResult[] = selector.getSearcherResults();
          for (const result of results) {
            expect(result.query).to.equal("8.8.8.8");
          }
          expect(results.length).to.equal(stats.text + stats.ip);
        });
      });
    });

    context("domain", () => {
      const selector: Selector = new Selector("urlscan.io");
      describe("#getDomain", () => {
        it("should return the domain", () => {
          expect(selector.getDomain()).to.equal("urlscan.io");
        });
      });
      describe("#getSearchersForDomain", () => {
        it("should return Searchers support domain", () => {
          expect(selector.getSearchersForDomain().length).to.equal(stats.domain);
        });
      });
      describe("#getSearcherResults", () => {
        it("should return SearchrerResults support domain", () => {
          const results: SearcherResult[] = selector.getSearcherResults();
          for (const result of results) {
            expect(result.query).to.equal("urlscan.io");
          }
          expect(results.length).to.equal(stats.text + stats.domain);
        });
      });
    });

    context("url", () => {
      const selector: Selector = new Selector("https://urlscan.io/");
      describe("#getUrl", () => {
        it("should return the domain", () => {
          expect(selector.getUrl()).to.equal("https://urlscan.io/");
        });
      });
      describe("#getSearchersForUrl", () => {
        it("should return Searchers support url", () => {
          expect(selector.getSearchersForUrl().length).to.equal(stats.url);
        });
      });
      describe("#getSearcherResults", () => {
        it("should return SearchrerResults support url", () => {
          const results: SearcherResult[] = selector.getSearcherResults();
          for (const result of results) {
            expect(result.query).to.equal("https://urlscan.io/");
          }
          expect(results.length).to.equal(stats.text + stats.url);
        });
      });
    });

    context("hash", () => {
      const selector: Selector = new Selector("275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f");
      describe("#getHash", () => {
        it("should return SHA256", () => {
          expect(selector.getHash()).to.equal("275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f");
          // additional tests
          const s2: Selector = new Selector("3395856ce81f2b7382dee72602f798b642f14140");
          expect(s2.getHash()).to.equal("3395856ce81f2b7382dee72602f798b642f14140");
          const s3: Selector = new Selector("44d88612fea8a8f36de82e1278abb02f");
          expect(s3.getHash()).to.equal("44d88612fea8a8f36de82e1278abb02f");
        });
      });
      describe("#getSearchersForHash", () => {
        it("should return Searchers support hash", () => {
          expect(selector.getSearchersForHash().length).to.equal(stats.hash);
        });
      });
      describe("#getSearcherResults", () => {
        it("should return SearchrerResults support hash", () => {
          const results: SearcherResult[] = selector.getSearcherResults();
          for (const result of results) {
            expect(result.query).to.equal("275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f");
          }
          expect(results.length).to.equal(stats.text + stats.hash);
        });
      });
    });
  });
});
