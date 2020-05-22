import "mocha";

import { expect } from "chai";

import { GoogleSafeBrowsing } from "../../src/lib/searcher";

describe("Google Safe Browsing", function () {
  const subject = new GoogleSafeBrowsing();

  it("should support domain & URL type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "url"]);
  });

  describe("#searchByDoman", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://transparencyreport.google.com/safe-browsing/search?url=github.com"
      );
    });
  });

  describe("#searchByURL", function () {
    it("should return URL", function () {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://transparencyreport.google.com/safe-browsing/search?url=https%3A%2F%2Fgithub.com"
      );
    });
  });
});
