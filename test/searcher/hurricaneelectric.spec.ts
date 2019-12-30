import { expect } from "chai";
import "mocha";
import { HurricaneElectric } from "../../src/lib/searcher";

describe("HurricaneElectric", function() {
  const subject = new HurricaneElectric();

  it("should support IP and domain", function() {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "asn"]);
  });

  describe("#searchByIP", function() {
    it("should return URL", function() {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://bgp.he.net/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function() {
    it("should return URL", function() {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://bgp.he.net/dns/github.com"
      );
    });
  });

  describe("#searchByASN", function() {
    it("should return URL", function() {
      expect(subject.searchByASN("AS2497")).to.equal(
        "https://bgp.he.net/AS2497"
      );
    });
  });
});
