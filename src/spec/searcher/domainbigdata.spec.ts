import { expect } from "chai";
import "mocha";
import { DomainBigData } from "../../lib/searcher";

describe("DomainBigData", () => {
  const subject = new DomainBigData();
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(subject.searchByDomain("github.com")).to.equal("https://domainbigdata.com/github.com");
    });
  });
});
