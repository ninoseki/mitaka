import { expect } from "chai";
import "mocha";
import { DomainBigData } from "../../src/lib/searcher";

describe("DomainBigData", () => {
  const subject = new DomainBigData();

  it("should support Domain, IP, Email type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain", "ip", "email"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://domainbigdata.com/github.com"
      );
    });
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("1.1.1.1")).to.equal(
        "https://domainbigdata.com/1.1.1.1"
      );
    });
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://domainbigdata.com/email/test@test.com"
      );
    });
  });
});
