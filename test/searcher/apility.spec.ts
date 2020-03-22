import { expect } from "chai";
import "mocha";
import { Apility } from "../../src/lib/searcher";

describe("Apility", function () {
  const subject = new Apility();

  it("should support IP type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "email",
      "asn",
    ]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://apility.io/search/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://apility.io/search/github.com"
      );
    });
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@example.com")).to.equal(
        "https://apility.io/search/test@example.com"
      );
    });
  });

  describe("#searchByASN", function () {
    it("should return URL", function () {
      expect(subject.searchByASN("AS1111")).to.equal(
        "https://apility.io/search/1111"
      );
    });
  });
});
