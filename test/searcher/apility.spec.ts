import { expect } from "chai";
import "mocha";
import { Apility } from "../../src/lib/searcher";

describe("Apility", () => {
  const subject = new Apility();

  it("should support IP type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "email",
      "asn",
    ]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://apility.io/search/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://apility.io/search/github.com"
      );
    });
  });

  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.searchByEmail("test@example.com")).to.equal(
        "https://apility.io/search/test@example.com"
      );
    });
  });

  describe("#searchByASN", () => {
    it("should return URL", () => {
      expect(subject.searchByASN("AS1111")).to.equal(
        "https://apility.io/search/1111"
      );
    });
  });
});
