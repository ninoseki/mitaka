import { expect } from "chai";
import "mocha";
import { SearchableType, Searcher, Searchers } from "../lib/searcher";
import { AnalyzerEntry, Selector } from "../lib/selector";

function numberOfSelectorsByType(type: SearchableType): number {
  const searchers: Searcher[] = Searchers;
  return searchers.filter((searcher: Searcher) => searcher.supportedTypes.indexOf(type) !== -1).length;
}

describe("Seletor", () => {
  const stats = {
    btc: numberOfSelectorsByType("btc"),
    cve: numberOfSelectorsByType("cve"),
    domain: numberOfSelectorsByType("domain"),
    email: numberOfSelectorsByType("email"),
    gaPubID: numberOfSelectorsByType("gaPubID"),
    gaTrackID: numberOfSelectorsByType("gaTrackID"),
    hash: numberOfSelectorsByType("hash"),
    ip: numberOfSelectorsByType("ip"),
    text: numberOfSelectorsByType("text"),
    url: numberOfSelectorsByType("url"),
    xmr: numberOfSelectorsByType("xmr"),
  };

  context("searcher", () => {
    context("text", () => {
      const selector: Selector = new Selector("text");
      describe("#getSearchersForText", () => {
        it("should return Searchers support text", () => {
          expect(selector.getSearchersByType("text").length).to.equal(stats.text);
        });
      });
      describe("#getAnalyzerEntrys", () => {
        it("should return Searchers support text", () => {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("text");
          }
          expect(entries.length).to.equal(stats.text);
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
          expect(selector.getSearchersByType("ip").length).to.equal(stats.ip);
        });
      });
      describe("#getAnalyzerEntrys", () => {
        it("should return Searchrerentrys support ip", () => {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("8.8.8.8");
          }
          expect(entries.length).to.equal(stats.text + stats.ip);
        });
      });
    });

    context("domain", () => {
      const selector: Selector = new Selector("www.google.com");
      describe("#getDomain", () => {
        it("should return the domain", () => {
          expect(selector.getDomain()).to.equal("www.google.com");
          expect(selector.getURL()).to.equal(null);
        });
      });
      describe("#getSearchersForDomain", () => {
        it("should return Searchers support domain", () => {
          expect(selector.getSearchersByType("domain").length).to.equal(stats.domain);
        });
      });
      describe("#getAnalyzerEntrys", () => {
        it("should return Searchrerentrys support domain", () => {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("www.google.com");
          }
          expect(entries.length).to.equal(stats.text + stats.domain);
        });
      });
    });

    context("url", () => {
      const selector: Selector = new Selector("https://urlscan.io/");
      describe("#getURL", () => {
        it("should return the url", () => {
          expect(selector.getURL()).to.equal("https://urlscan.io/");
        });
      });
      describe("#getSearchersForUrl", () => {
        it("should return Searchers support url", () => {
          expect(selector.getSearchersByType("url").length).to.equal(stats.url);
        });
      });
      describe("#getAnalyzerEntrys", () => {
        it("should return Searchrerentrys support url", () => {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("https://urlscan.io/");
          }
          expect(entries.length).to.equal(stats.text + stats.url);
        });
      });
    });

    context("email", () => {
      const selector: Selector = new Selector("test@test.com");
      describe("#getEmail", () => {
        it("should return the email", () => {
          expect(selector.getEmail()).to.equal("test@test.com");
        });
      });
      describe("#getSearchersForEmail", () => {
        it("should return Searchers support email", () => {
          expect(selector.getSearchersByType("email").length).to.equal(stats.email);
        });
      });
      describe("#getAnalyzerEntrys", () => {
        it("should return Searchrerentrys support email", () => {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("test@test.com");
          }
          expect(entries.length).to.equal(stats.text + stats.email);
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
          expect(selector.getSearchersByType("hash").length).to.equal(stats.hash);
        });
      });
      describe("#getAnalyzerEntrys", () => {
        it("should return Searchrerentrys support hash", () => {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f");
          }
          expect(entries.length).to.equal(stats.text + stats.hash);
        });
      });
    });

    context("cve", () => {
      const selector: Selector = new Selector("CVE-2018-8013");
      describe("#getCVE", () => {
        it("should return CVE", () => {
          expect(selector.getCVE()).to.equal("CVE-2018-8013");
        });
      });
      describe("#getSearchersForCVE", () => {
        it("should return Searchers support CVE", () => {
          expect(selector.getSearchersByType("cve").length).to.equal(stats.cve);
        });
      });
      describe("#getAnalyzerEntrys", () => {
        it("should return Searchrerentrys support cve", () => {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("CVE-2018-8013");
          }
          expect(entries.length).to.equal(stats.text + stats.cve);
        });
      });
    });

    context("btc", () => {
      const selector: Selector = new Selector("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
      describe("#getBTC", () => {
        it("should return BTC", () => {
          expect(selector.getBTC()).to.equal("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
        });
      });
      describe("#getSearchersForBTC", () => {
        it("should return Searchers support BTC", () => {
          expect(selector.getSearchersByType("btc").length).to.equal(stats.btc);
        });
      });
      describe("#getAnalyzerEntrys", () => {
        it("should return Searchrerentrys support btc", () => {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
          }
          expect(entries.length).to.equal(stats.text + stats.btc);
        });
      });
    });

    context("xmr", () => {
      const selector: Selector = new Selector("4Aa3TcU7ixMVcYwbsw8ENVbFwt4ZuqrNBVij5TRvPCTpGRK5BKBHQPu7ahT7z2A6547a5Lcn7yPZV1xU22ZbviqxUX7JVuP");
      describe("#getXMR", () => {
        it("should return XMR", () => {
          expect(selector.getXMR()).to.equal("4Aa3TcU7ixMVcYwbsw8ENVbFwt4ZuqrNBVij5TRvPCTpGRK5BKBHQPu7ahT7z2A6547a5Lcn7yPZV1xU22ZbviqxUX7JVuP");
        });
      });
      describe("#getSearchersForBTC", () => {
        it("should return Searchers support BTC", () => {
          expect(selector.getSearchersByType("xmr").length).to.equal(stats.xmr);
        });
      });
    });

    context("gaTrackID", () => {
      const selector: Selector = new Selector("UA-67609351-1");
      describe("#getGATrackID", () => {
        it("should return GATrackID", () => {
          expect(selector.getGATrackID()).to.equal("UA-67609351-1");
        });
      });
      describe("#getSearchersForGATrackID", () => {
        it("should return Searchers support GATrackID", () => {
          expect(selector.getSearchersByType("gaTrackID").length).to.equal(stats.gaTrackID);
        });
      });
    });

    context("gaPubID", () => {
      const selector: Selector = new Selector("pub-9383614236930773");
      describe("#getGAPubID", () => {
        it("should return GAPubID", () => {
          expect(selector.getGAPubID()).to.equal("pub-9383614236930773");
        });
      });
      describe("#getSearchersForGAPubID", () => {
        it("should return Searchers support GAPubID", () => {
          expect(selector.getSearchersByType("gaPubID").length).to.equal(stats.gaPubID);
        });
      });
    });
  });
});
