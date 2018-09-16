import { expect } from "chai";
import "mocha";
import { FortiGuard } from "../../lib/searcher";

describe("FortiGuard", () => {
  describe("#searchByIP", () => {
    it("should return URL", () => {
      const fortiGuard = new FortiGuard();
      expect(fortiGuard.searchByIP("1.1.1.1")).to.equal("https://fortiguard.com/search?q=1.1.1.1&engine=8");
    });
  });
  describe("#searchByURL", () => {
    it("should return URL", () => {
      const fortiGuard = new FortiGuard();
      expect(fortiGuard.searchByURL("https://github.com")).to.equal("https://fortiguard.com/webfilter?q=https%3A%2F%2Fgithub.com");
    });
  });
  describe("#searchByCVE", () => {
    it("should return URL", () => {
      const fortiGuard = new FortiGuard();
      expect(fortiGuard.searchByCVE("CVE-2017-2991")).to.equal("https://fortiguard.com/search?q=CVE-2017-2991&engine=3");
    });
  });
});
