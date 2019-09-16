import { expect } from "chai";
import "mocha";
import { BGPView } from "../../src/lib/searcher";

describe("BGPView", () => {
  const subject = new BGPView();

  it("should support IP & ASN type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "asn"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://bgpview.io/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByASN", () => {
    it("should return URL", () => {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://bgpview.io/asn/13335"
      );
    });
  });
});
