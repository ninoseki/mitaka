import "mocha";

import { expect } from "chai";

import { XForceExchange } from "@/searcher";

describe("X-Force Exchange", function () {
  const subject = new XForceExchange();

  it("should support ip, domain and hash", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "hash"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://exchange.xforce.ibmcloud.com/ip/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://exchange.xforce.ibmcloud.com/url/${domain}`
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).to.equal(
        `https://exchange.xforce.ibmcloud.com/malware/${hash}`
      );
    });
  });
});
