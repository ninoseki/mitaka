import { expect } from "chai";
import "mocha";
import { FindSubDomains } from "../../lib/searcher";

describe("FindSubDomain", () => {
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      const findsubdomains = new FindSubDomains();
      expect(findsubdomains.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(findsubdomains.searchByDomain("github.com")).
        to.equal("https://findsubdomains.com/subdomains-of/github.com");
    });
  });
});
