import "mocha";

import { expect } from "chai";

import { Shodan } from "@/searcher";

describe("Shodan", function () {
  const subject = new Shodan();

  it("should support ip, domain ans asn", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "asn"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://www.shodan.io/host/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        "https://www.shodan.io/search?query=hostname%3Agithub.com"
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).to.equal(
        "https://www.shodan.io/search?query=asn%3AAS13335"
      );
    });
  });
});
