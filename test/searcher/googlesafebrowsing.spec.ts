import "mocha";

import { expect } from "chai";

import { GoogleSafeBrowsing } from "@/searcher";

describe("Google Safe Browsing", function () {
  const subject = new GoogleSafeBrowsing();

  it("should support domain and url", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "url"]);
  });

  describe("#searchByDoman", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://transparencyreport.google.com/safe-browsing/search?url=${domain}`
      );
    });
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).to.equal(
        "https://transparencyreport.google.com/safe-browsing/search?url=https%3A%2F%2Fgithub.com"
      );
    });
  });
});
