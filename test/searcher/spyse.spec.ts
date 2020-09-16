import "mocha";

import { expect } from "chai";

import { Spyse } from "../../src/lib/searcher";

describe("Spyse", function () {
  const subject = new Spyse();

  it("should support ip, domain and asn", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "asn"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://spyse.com/target/ip/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://spyse.com/target/domain/${domain}`
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).to.equal(
        "https://spyse.com/target/as/13335"
      );
    });
  });
});
