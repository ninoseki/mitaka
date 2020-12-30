import "mocha";

import { expect } from "chai";

import { Scanners } from "@/scanner";
import { Selector } from "@/selector";
import { AnalyzerEntry, ScannableType, Scanner } from "@/types";

function numberOfScannersByType(type: ScannableType): number {
  return Scanners.filter((scanner: Scanner) =>
    scanner.supportedTypes.includes(type)
  ).length;
}

describe("Selector", function () {
  const stats = {
    domain: numberOfScannersByType("domain"),
    ip: numberOfScannersByType("ip"),
    url: numberOfScannersByType("url"),
  };

  context("scanner", function () {
    describe("#getScannersByType", function () {
      const selector: Selector = new Selector("test");
      it("should return scanners which support ip", function () {
        expect(selector.getScannersByType("ip").length).to.equal(stats.ip);
      });

      it("should return scanners which support domain", function () {
        expect(selector.getScannersByType("domain").length).to.equal(
          stats.domain
        );
      });

      it("should return scanners support url", function () {
        expect(selector.getScannersByType("url").length).to.equal(stats.url);
      });
    });

    context("ip", function () {
      const ip = "8.8.8.8";
      const selector: Selector = new Selector(ip);
      describe("#getScannerEntries", function () {
        it("should return scanners which support ip", function () {
          const entries: AnalyzerEntry[] = selector.getScannerEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(ip);
          }
          expect(entries.length).to.equal(stats.ip);
        });
      });
    });

    context("domain", function () {
      const domain = "urlscan.io";
      const selector: Selector = new Selector(domain);
      describe("#getScannerEntries", function () {
        it("should return scanners which support domain", function () {
          const entries: AnalyzerEntry[] = selector.getScannerEntries();
          for (const entry of entries) {
            expect(entry.query).to.equal(domain);
          }
          expect(entries.length).to.equal(stats.domain);
        });
      });
    });

    context("url", function () {
      const selector: Selector = new Selector("https://urlscan.io/");
      describe("#getScannerEntries", function () {
        it("should return Scanners support url", function () {
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
