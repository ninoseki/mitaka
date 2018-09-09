import { expect } from "chai";
import "mocha";
import { DomainWatch } from "../../lib/searcher";

describe("DomainWatch", () => {
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      const domainWatch = new DomainWatch();
      expect(domainWatch.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(domainWatch.searchByDomain("github.com")).
        to.equal("https://domainwat.ch/whois/github.com");
    });
  });
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      const domainWatch = new DomainWatch();
      expect(domainWatch.supportedTypes.indexOf("email")).not.equal(-1);
      expect(domainWatch.searchByEmail("test@test.com")).
        to.equal("https://domainwat.ch/search?query=test%40test.com");
    });
  });
});
