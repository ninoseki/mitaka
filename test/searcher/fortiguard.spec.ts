import { expect } from "chai";
import "mocha";
import { FortiGuard } from "../../src/lib/searcher";

describe("FortiGuard", function() {
  const subject = new FortiGuard();

  it("should support IP, URL & CVE type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["ip", "url", "cve"]);
  });

  describe("#searchByIP", function() {
    it("should return URL", function() {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://fortiguard.com/search?q=1.1.1.1&engine=8"
      );
    });
  });

  describe("#searchByURL", function() {
    it("should return URL", function() {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://fortiguard.com/webfilter?q=https%3A%2F%2Fgithub.com"
      );
    });
  });

  describe("#searchByCVE", function() {
    it("should return URL", function() {
      expect(subject.searchByCVE("CVE-2017-2991")).to.equal(
        "https://fortiguard.com/search?q=CVE-2017-2991&engine=3"
      );
    });
  });
});
