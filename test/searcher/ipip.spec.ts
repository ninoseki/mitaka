import { expect } from "chai";
import "mocha";
import { IPIP } from "../../src/lib/searcher";

describe("IPIP", () => {
  const subject = new IPIP();

  it("should support IP & ASN type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "asn"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://en.ipip.net/ip/1.1.1.1.html"
      );
    });
  });

  describe("#searchByASN", () => {
    it("should return URL", () => {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://whois.ipip.net/AS13335"
      );
    });
  });
});
