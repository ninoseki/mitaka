import { expect } from "chai";
import "mocha";
import { Searchers } from "../src/lib/searcher";
import { Selector } from "../src/lib/selector";
import { Searcher, SearchableType, AnalyzerEntry } from "./lib/types";

function numberOfSelectorsByType(type: SearchableType): number {
  const searchers = Searchers;
  return searchers.filter((searcher: Searcher) =>
    searcher.supportedTypes.includes(type)
  ).length;
}

describe("Seletor", function () {
  const stats = {
    asn: numberOfSelectorsByType("asn"),
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

  context("searcher", function () {
    context("text", function () {
      const selector: Selector = new Selector("text");
      describe("#getSearchersForText", function () {
        it("should return Searchers support text", function () {
          expect(selector.getSearchersByType("text").length).to.equal(
            stats.text
          );
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchers support text", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("text");
          }
          expect(entries.length).to.equal(stats.text);
        });
      });
    });

    context("ip", function () {
      const selector: Selector = new Selector("8.8.8.8");
      describe("#getIP", function () {
        it("should return the ip", function () {
          expect(selector.getIP()).to.equal("8.8.8.8");
        });
      });

      describe("#getSearchersForIP", function () {
        it("should return Searchers support ip", function () {
          expect(selector.getSearchersByType("ip").length).to.equal(stats.ip);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchrerentrys support ip", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("8.8.8.8");
          }
          expect(entries.length).to.equal(stats.text + stats.ip);
        });
      });
    });

    context("domain", function () {
      const selector: Selector = new Selector("www.google.com");
      describe("#getDomain", function () {
        it("should return the domain", function () {
          expect(selector.getDomain()).to.equal("www.google.com");
          expect(selector.getURL()).to.equal(null);
        });
      });

      describe("#getSearchersForDomain", function () {
        it("should return Searchers support domain", function () {
          expect(selector.getSearchersByType("domain").length).to.equal(
            stats.domain
          );
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchrerentrys support domain", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("www.google.com");
          }
          expect(entries.length).to.equal(stats.text + stats.domain);
        });
      });
    });

    context("url", function () {
      const selector: Selector = new Selector("https://urlscan.io/");
      describe("#getURL", function () {
        it("should return the url", function () {
          expect(selector.getURL()).to.equal("https://urlscan.io/");
        });
      });

      describe("#getSearchersForUrl", function () {
        it("should return Searchers support url", function () {
          expect(selector.getSearchersByType("url").length).to.equal(stats.url);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchrerentrys support url", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("https://urlscan.io/");
          }
          expect(entries.length).to.equal(stats.text + stats.url);
        });
      });
    });

    context("email", function () {
      const selector: Selector = new Selector("test@test.com");
      describe("#getEmail", function () {
        it("should return the email", function () {
          expect(selector.getEmail()).to.equal("test@test.com");
        });
      });

      describe("#getSearchersForEmail", function () {
        it("should return Searchers support email", function () {
          expect(selector.getSearchersByType("email").length).to.equal(
            stats.email
          );
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchrerentrys support email", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("test@test.com");
          }
          expect(entries.length).to.equal(stats.text + stats.email);
        });
      });
    });

    context("asn", function () {
      const selector: Selector = new Selector("ASN15169");
      describe("#getASN", function () {
        it("should return the asn", function () {
          expect(selector.getASN()).to.equal("ASN15169");
        });
      });

      describe("#getSearchersForASN", function () {
        it("should return Searchers support asn", function () {
          expect(selector.getSearchersByType("asn").length).to.equal(stats.asn);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchrerentrys support asn", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("ASN15169");
          }
          expect(entries.length).to.equal(stats.text + stats.asn);
        });
      });
    });

    context("hash", function () {
      const selector: Selector = new Selector(
        "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f"
      );
      describe("#getHash", function () {
        it("should return SHA256", function () {
          expect(selector.getHash()).to.equal(
            "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f"
          );
          // additional tests
          const s2: Selector = new Selector(
            "3395856ce81f2b7382dee72602f798b642f14140"
          );
          expect(s2.getHash()).to.equal(
            "3395856ce81f2b7382dee72602f798b642f14140"
          );
          const s3: Selector = new Selector("44d88612fea8a8f36de82e1278abb02f");
          expect(s3.getHash()).to.equal("44d88612fea8a8f36de82e1278abb02f");
        });
      });

      describe("#getSearchersForHash", function () {
        it("should return Searchers support hash", function () {
          expect(selector.getSearchersByType("hash").length).to.equal(
            stats.hash
          );
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchrerentrys support hash", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(
              "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f"
            );
          }
          expect(entries.length).to.equal(stats.text + stats.hash);
        });
      });
    });

    context("cve", function () {
      const selector: Selector = new Selector("CVE-2018-8013");
      describe("#getCVE", function () {
        it("should return CVE", function () {
          expect(selector.getCVE()).to.equal("CVE-2018-8013");
        });
      });

      describe("#getSearchersForCVE", function () {
        it("should return Searchers support CVE", function () {
          expect(selector.getSearchersByType("cve").length).to.equal(stats.cve);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchrerentrys support cve", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("CVE-2018-8013");
          }
          expect(entries.length).to.equal(stats.text + stats.cve);
        });
      });
    });

    context("btc", function () {
      const selector: Selector = new Selector(
        "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
      );
      describe("#getBTC", function () {
        it("should return BTC", function () {
          expect(selector.getBTC()).to.equal(
            "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
          );
        });
      });

      describe("#getSearchersForBTC", function () {
        it("should return Searchers support BTC", function () {
          expect(selector.getSearchersByType("btc").length).to.equal(stats.btc);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return Searchrerentrys support btc", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
          }
          expect(entries.length).to.equal(stats.text + stats.btc);
        });
      });
    });

    context("xmr", function () {
      const selector: Selector = new Selector(
        "4Aa3TcU7ixMVcYwbsw8ENVbFwt4ZuqrNBVij5TRvPCTpGRK5BKBHQPu7ahT7z2A6547a5Lcn7yPZV1xU22ZbviqxUX7JVuP"
      );
      describe("#getXMR", function () {
        it("should return XMR", function () {
          expect(selector.getXMR()).to.equal(
            "4Aa3TcU7ixMVcYwbsw8ENVbFwt4ZuqrNBVij5TRvPCTpGRK5BKBHQPu7ahT7z2A6547a5Lcn7yPZV1xU22ZbviqxUX7JVuP"
          );
        });
      });

      describe("#getSearchersForBTC", function () {
        it("should return Searchers support BTC", function () {
          expect(selector.getSearchersByType("xmr").length).to.equal(stats.xmr);
        });
      });
    });

    context("gaTrackID", function () {
      const selector: Selector = new Selector("UA-67609351-1");
      describe("#getGATrackID", function () {
        it("should return GATrackID", function () {
          expect(selector.getGATrackID()).to.equal("UA-67609351-1");
        });
      });

      describe("#getSearchersForGATrackID", function () {
        it("should return Searchers support GATrackID", function () {
          expect(selector.getSearchersByType("gaTrackID").length).to.equal(
            stats.gaTrackID
          );
        });
      });
    });

    context("gaPubID", function () {
      const selector: Selector = new Selector("pub-9383614236930773");
      describe("#getGAPubID", function () {
        it("should return GAPubID", function () {
          expect(selector.getGAPubID()).to.equal("pub-9383614236930773");
        });
      });

      describe("#getSearchersForGAPubID", function () {
        it("should return Searchers support GAPubID", function () {
          expect(selector.getSearchersByType("gaPubID").length).to.equal(
            stats.gaPubID
          );
        });
      });
    });
  });
});
