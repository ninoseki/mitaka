import { expect } from "chai";
import "mocha";
import { GoogleSafeBrowsing } from "../../src/lib/searcher";

describe("Google Safe Browsing", () => {
  const subject = new GoogleSafeBrowsing();

  it("should support domain & URL type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain", "url"]);
  });

  describe("#searchByDoman", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://transparencyreport.google.com/safe-browsing/search?url=github.com"
      );
    });
  });

  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://transparencyreport.google.com/safe-browsing/search?url=https%3A%2F%2Fgithub.com"
      );
    });
  });
});
