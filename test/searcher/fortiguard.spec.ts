import "mocha";

import { expect } from "chai";

import { FortiGuard } from "../../src/lib/searcher";

describe("FortiGuard", function () {
  const subject = new FortiGuard();

  it("should support ip, url and cve", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "url", "cve"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://fortiguard.com/search?q=${ip}&engine=8`
      );
    });
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).to.equal(
        "https://fortiguard.com/webfilter?q=https%3A%2F%2Fgithub.com"
      );
    });
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2017-2991";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).to.equal(
        `https://fortiguard.com/search?q=${cve}&engine=3`
      );
    });
  });
});
