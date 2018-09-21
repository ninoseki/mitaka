import { expect } from "chai";
import "mocha";
import { DomainWatch } from "../../lib/searcher";

describe("DomainWatch", () => {
  const subject = new DomainWatch();
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(subject.searchByDomain("github.com")).
        to.equal("https://domainwat.ch/whois/github.com");
    });
  });
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("email")).not.equal(-1);
      expect(subject.searchByEmail("test@test.com")).
        to.equal("https://domainwat.ch/search?query=test%40test.com");
    });
  });
});
