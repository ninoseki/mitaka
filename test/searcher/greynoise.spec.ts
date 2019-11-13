import { expect } from "chai";
import "mocha";
import { GreyNoise } from "../../src/lib/searcher";

describe("GreyNoise", function() {
  const subject = new GreyNoise();

  it("should support ip, domain & asn types", function() {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "asn"]);
  });

  describe("#searchByIP", function() {
    it("should return URL", function() {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://viz.greynoise.io/query?gnql=ip%3A1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function() {
    it("should return URL", function() {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://viz.greynoise.io/query?gnql=metadata.rdns%3Agithub.com"
      );
    });
  });

  describe("#searchByASN", function() {
    it("should return URL", function() {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://viz.greynoise.io/query?gnql=metadata.asn%3AAS13335"
      );
    });
  });
});
