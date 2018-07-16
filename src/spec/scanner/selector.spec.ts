import { expect } from "chai";
import "mocha";
import { ScannerResult, Selector } from "../../lib/selector";

describe("Seletor", () => {
  const stats = {
    // urlscan
    domain: 1,
    // urlscan
    ip: 1,
    // urlscan, virustotal
    url: 2,
  };
  context("scanner", () => {
    describe("#getScannersByType", () => {
      const selector: Selector = new Selector("test");
      it("should return Scanners support ip", () => {
        expect(selector.getScannersByType("ip").length).to.equal(stats.ip);
      });

      it("should return Scanners support domain", () => {
        expect(selector.getScannersByType("domain").length).to.equal(stats.domain);
      });

      it("should return Scanners support url", () => {
        expect(selector.getScannersByType("url").length).to.equal(stats.url);
      });
    });

    context("ip", () => {
      const selector: Selector = new Selector("8.8.8.8");
      describe("#getScannerResults", () => {
        it("should return Scanners support ip", () => {
          const results: ScannerResult[] = selector.getScannerResults();
          for (const result of results) {
            expect(result.query).to.equal("8.8.8.8");
          }
          expect(results.length).to.equal(stats.ip);
        });
      });
    });

    context("domain", () => {
      const selector: Selector = new Selector("urlscan.io");
      describe("#getScannerResults", () => {
        it("should return Scanners support domain", () => {
          const results: ScannerResult[] = selector.getScannerResults();
          for (const result of results) {
            expect(result.query).to.equal("urlscan.io");
          }
          expect(results.length).to.equal(stats.domain);
        });
      });
    });

    context("url", () => {
      const selector: Selector = new Selector("https://urlscan.io/");
      describe("#getScannerResults", () => {
        it("should return Scanners support url", () => {
          const results: ScannerResult[] = selector.getScannerResults();
          for (const result of results) {
            expect(result.query).to.equal("https://urlscan.io/");
          }
          expect(results.length).to.equal(stats.url);
        });
      });
    });
  });
});
