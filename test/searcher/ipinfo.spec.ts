import { expect } from "chai";
import "mocha";
import { IPinfo } from "../../src/lib/searcher";

describe("IPinfo", function () {
  const subject = new IPinfo();

  it("should support IP & ASN type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "asn"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://ipinfo.io/1.1.1.1"
      );
    });
  });

  describe("#searchByASN", function () {
    it("should return URL", function () {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://ipinfo.io/AS13335"
      );
    });
  });
});
