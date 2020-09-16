import "mocha";

import { expect } from "chai";

import { IPIP } from "../../src/lib/searcher";

describe("IPIP", function () {
  const subject = new IPIP();

  it("should support ip and asn", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "asn"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://en.ipip.net/ip/${ip}.html`
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).to.equal(
        `https://whois.ipip.net/${asn}`
      );
    });
  });
});
