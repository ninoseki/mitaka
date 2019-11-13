import { expect } from "chai";
import "mocha";
import { BGPView } from "../../src/lib/searcher";

describe("BGPView", function() {
  const subject = new BGPView();

  it("should support IP & ASN type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["ip", "asn"]);
  });

  describe("#searchByIP", function() {
    it("should return URL", function() {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://bgpview.io/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByASN", function() {
    it("should return URL", function() {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://bgpview.io/asn/13335"
      );
    });
  });
});
