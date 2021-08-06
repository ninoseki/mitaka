import "mocha";

import { expect } from "chai";

import { AlienVault } from "@/searcher";

describe("AlienVault", function () {
  const subject = new AlienVault();

  it("should support url, CVE, domain, ip and hash", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "url",
      "hash",
      "cve",
    ]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://otx.alienvault.com/indicator/domain/${domain}`
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://otx.alienvault.com/indicator/ip/${ip}`
      );
    });
  });

  describe("#searchByHash", function () {
    it("should return a URL", function () {
      const md5 = "44d88612fea8a8f36de82e1278abb02f";
      expect(subject.searchByHash(md5)).to.equal(
        `https://otx.alienvault.com/indicator/hash/${md5}`
      );
    });
  });

  describe("#searchByCVE", function () {
    it("should return a URL", function () {
      const cve = "44d88612fea8a8f36de82e1278abb02f";
      expect(subject.searchByCVE(cve)).to.equal(
        `https://otx.alienvault.com/indicator/cve/${cve}`
      );
    });
  });

  describe("#searchByURL", function () {
    it("should return a URL", function () {
      const url = "https://github.com";
      expect(subject.searchByURL(url)).to.equal(
        `https://otx.alienvault.com/indicator/url/${url}`
      );
    });
  });
});
