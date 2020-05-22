import "mocha";

import { expect } from "chai";

import { IPIP } from "../../src/lib/searcher";

describe("IPIP", function () {
  const subject = new IPIP();

  it("should support IP & ASN type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "asn"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://en.ipip.net/ip/1.1.1.1.html"
      );
    });
  });

  describe("#searchByASN", function () {
    it("should return URL", function () {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://whois.ipip.net/AS13335"
      );
    });
  });
});
