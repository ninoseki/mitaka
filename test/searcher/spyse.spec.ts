import { expect } from "chai";
import "mocha";
import { Spyse } from "../../src/lib/searcher";

describe("Spyse", function () {
  const subject = new Spyse();

  it("should support IP, domain and ASN", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "asn"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://spyse.com/target/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("example.com")).to.equal(
        "https://spyse.com/target/domain/example.com"
      );
    });
  });

  describe("#searchByASN", function () {
    it("should return URL", function () {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://spyse.com/target/as/13335"
      );
    });
  });
});
