import { expect } from "chai";
import "mocha";
import { FortiGuard } from "../../src/lib/searcher";

describe("FortiGuard", () => {
  const subject = new FortiGuard();

  it("should support IP, URL & CVE type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "url", "cve"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://fortiguard.com/search?q=1.1.1.1&engine=8"
      );
    });
  });

  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://fortiguard.com/webfilter?q=https%3A%2F%2Fgithub.com"
      );
    });
  });

  describe("#searchByCVE", () => {
    it("should return URL", () => {
      expect(subject.searchByCVE("CVE-2017-2991")).to.equal(
        "https://fortiguard.com/search?q=CVE-2017-2991&engine=3"
      );
    });
  });
});
