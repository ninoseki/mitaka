import { expect } from "chai";
import "mocha";
import { DomainWatch } from "../../src/lib/searcher";

describe("DomainWatch", () => {
  const subject = new DomainWatch();

  it("should support Domain & Email type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain", "email"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://domainwat.ch/whois/github.com"
      );
    });
  });
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://domainwat.ch/search?query=test%40test.com"
      );
    });
  });
});
