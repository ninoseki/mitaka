import { expect } from "chai";
import "mocha";
import { AnalyzerEntry, Selector } from "../../lib/selector";

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
      describe("#getScannerentrys", () => {
        it("should return Scanners support ip", () => {
          const entries: AnalyzerEntry[] = selector.getScannerEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("8.8.8.8");
          }
          expect(entries.length).to.equal(stats.ip);
        });
      });
    });

    context("domain", () => {
      const selector: Selector = new Selector("urlscan.io");
      describe("#getScannerentrys", () => {
        it("should return Scanners support domain", () => {
          const entries: AnalyzerEntry[] = selector.getScannerEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("urlscan.io");
          }
          expect(entries.length).to.equal(stats.domain);
        });
      });
    });

    context("url", () => {
      const selector: Selector = new Selector("https://urlscan.io/");
      describe("#getScannerentrys", () => {
        it("should return Scanners support url", () => {
          const entries: AnalyzerEntry[] = selector.getScannerEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal("https://urlscan.io/");
          }
          expect(entries.length).to.equal(stats.url);
        });
      });
    });
  });
});
