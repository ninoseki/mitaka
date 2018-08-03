import { expect } from "chai";
import "mocha";
import { AnalyzerEntry, Selector } from "../lib/selector";

describe("Seletor", () => {
  const stats = {
    // domainbigdata, findsubdomains, pulsedive, securitytrails
    // threatcrowd, urlscan, virustotal, xforce-exchange
    // viewDNS
    domain: 9,
    // hybridanalysis, pulsedive, virustotal, xforceexchange
    hash: 4,
    // securitytrails, pulsedive, threatcrowd urlscan
    // virustotal, xforceexchange, viewDNS, ONYPHE
    ip: 8,
    // shodan, censys, publicwww
    text: 3,
    // urlscan, pulsedive, virustotal
    url: 3,
    // viewDNS, threatcrowd
    email: 2,
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
          expect(selector.getUrl()).to.equal(null);
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
      describe("#getUrl", () => {
        it("should return the url", () => {
          expect(selector.getUrl()).to.equal("https://urlscan.io/");
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
  });
});
