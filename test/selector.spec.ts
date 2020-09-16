import "mocha";

import { expect } from "chai";

import { Searchers } from "../src/lib/searcher";
import { Selector } from "../src/lib/selector";
import { AnalyzerEntry, SearchableType, Searcher } from "./lib/types";

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
    eth: numberOfSelectorsByType("eth"),
    gaPubID: numberOfSelectorsByType("gaPubID"),
    gaTrackID: numberOfSelectorsByType("gaTrackID"),
    hash: numberOfSelectorsByType("hash"),
    ip: numberOfSelectorsByType("ip"),
    text: numberOfSelectorsByType("text"),
    url: numberOfSelectorsByType("url"),
  };

  context("searcher", function () {
    context("text", function () {
      const selector: Selector = new Selector("text");
      describe("#getSearchersForText", function () {
        it("should return searchers which support text", function () {
          expect(selector.getSearchersByType("text").length).to.equal(
            stats.text
          );
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return searchers which support text", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("text");
          }
          expect(entries.length).to.equal(stats.text);
        });
      });
    });

    context("ip", function () {
      const ip = "1.1.1.1";
      const selector: Selector = new Selector(ip);
      describe("#getIP", function () {
        it("should return the ip", function () {
          expect(selector.getIP()).to.equal(ip);
        });
      });

      describe("#getSearchersForIP", function () {
        it("should return searchers which support ip", function () {
          expect(selector.getSearchersByType("ip").length).to.equal(stats.ip);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support ip", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(ip);
          }
          expect(entries.length).to.equal(stats.text + stats.ip);
        });
      });
    });

    context("domain", function () {
      const domain = "github.com";
      const selector: Selector = new Selector(domain);
      describe("#getDomain", function () {
        it("should return the domain", function () {
          expect(selector.getDomain()).to.equal(domain);
          expect(selector.getURL()).to.equal(null);
        });
      });

      describe("#getSearchersForDomain", function () {
        it("should return searchers which support domain", function () {
          expect(selector.getSearchersByType("domain").length).to.equal(
            stats.domain
          );
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support domain", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(domain);
          }
          expect(entries.length).to.equal(stats.text + stats.domain);
        });
      });
    });

    context("url", function () {
      const url = "http://github.com";
      const selector: Selector = new Selector(url);
      describe("#getURL", function () {
        it("should return the url", function () {
          expect(selector.getURL()).to.equal(url);
        });
      });

      describe("#getSearchersForUrl", function () {
        it("should return searchers which support url", function () {
          expect(selector.getSearchersByType("url").length).to.equal(stats.url);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support url", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(url);
          }
          expect(entries.length).to.equal(stats.text + stats.url);
        });
      });
    });

    context("email", function () {
      const email = "test@test.com";
      const selector: Selector = new Selector(email);
      describe("#getEmail", function () {
        it("should return the email", function () {
          expect(selector.getEmail()).to.equal(email);
        });
      });

      describe("#getSearchersForEmail", function () {
        it("should return searchers which support email", function () {
          expect(selector.getSearchersByType("email").length).to.equal(
            stats.email
          );
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support email", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(email);
          }
          expect(entries.length).to.equal(stats.text + stats.email);
        });
      });
    });

    context("asn", function () {
      const asn = "ASN15169";
      const selector: Selector = new Selector(asn);
      describe("#getASN", function () {
        it("should return the asn", function () {
          expect(selector.getASN()).to.equal(asn);
        });
      });

      describe("#getSearchersForASN", function () {
        it("should return searchers which support asn", function () {
          expect(selector.getSearchersByType("asn").length).to.equal(stats.asn);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support asn", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(asn);
          }
          expect(entries.length).to.equal(stats.text + stats.asn);
        });
      });
    });

    context("hash", function () {
      const sha256 =
        "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
      const selector: Selector = new Selector(sha256);
      describe("#getHash", function () {
        it("should return SHA256", function () {
          expect(selector.getHash()).to.equal(sha256);

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
        it("should return searchers which support hash", function () {
          expect(selector.getSearchersByType("hash").length).to.equal(
            stats.hash
          );
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support hash", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(sha256);
          }
          expect(entries.length).to.equal(stats.text + stats.hash);
        });
      });
    });

    context("cve", function () {
      const cve = "CVE-2018-8013";
      const selector: Selector = new Selector(cve);
      describe("#getCVE", function () {
        it("should return CVE", function () {
          expect(selector.getCVE()).to.equal(cve);
        });
      });

      describe("#getSearchersForCVE", function () {
        it("should return searchers which support CVE", function () {
          expect(selector.getSearchersByType("cve").length).to.equal(stats.cve);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support cve", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(cve);
          }
          expect(entries.length).to.equal(stats.text + stats.cve);
        });
      });
    });

    context("btc", function () {
      const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
      const selector: Selector = new Selector(btc);
      describe("#getBTC", function () {
        it("should return BTC", function () {
          expect(selector.getBTC()).to.equal(btc);
        });
      });

      describe("#getSearchersForBTC", function () {
        it("should return searchers which support BTC", function () {
          expect(selector.getSearchersByType("btc").length).to.equal(stats.btc);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support btc", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(btc);
          }
          expect(entries.length).to.equal(stats.text + stats.btc);
        });
      });
    });

    context("gaTrackID", function () {
      const id = "UA-67609351-1";
      const selector: Selector = new Selector(id);
      describe("#getGATrackID", function () {
        it("should return GATrackID", function () {
          expect(selector.getGATrackID()).to.equal(id);
        });
      });

      describe("#getSearchersForGATrackID", function () {
        it("should return searchers which support GATrackID", function () {
          expect(selector.getSearchersByType("gaTrackID").length).to.equal(
            stats.gaTrackID
          );
        });
      });
    });

    context("gaPubID", function () {
      const id = "pub-9383614236930773";
      const selector: Selector = new Selector(id);
      describe("#getGAPubID", function () {
        it("should return GAPubID", function () {
          expect(selector.getGAPubID()).to.equal(id);
        });
      });

      describe("#getSearchersForGAPubID", function () {
        it("should return searchers support GAPubID", function () {
          expect(selector.getSearchersByType("gaPubID").length).to.equal(
            stats.gaPubID
          );
        });
      });
    });

    context("eth", function () {
      const eth = "0x4966db520b0680fc19df5d7774ca96f42e6abd4f";
      const selector: Selector = new Selector(eth);
      describe("#getETH", function () {
        it("should return ETH address", function () {
          expect(selector.getETH()).to.equal(eth);
        });
      });

      describe("#getSearchersForETH", function () {
        it("should return searchers which support ETH", function () {
          expect(selector.getSearchersByType("eth").length).to.equal(stats.eth);
        });
      });

      describe("#getAnalyzerEntrys", function () {
        it("should return entries which support ETH", function () {
          const entries: AnalyzerEntry[] = selector.getSearcherEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(eth);
          }
          expect(entries.length).to.equal(stats.text + stats.eth);
        });
      });
    });
  });
});
