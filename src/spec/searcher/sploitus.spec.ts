import { expect } from "chai";
import "mocha";
import { Sploitus } from "../../lib/searcher";

describe("Sploitus", () => {
  const subject = new Sploitus();
  describe("#searchByCVE", () => {
    it("should return URL", () => {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal("https://sploitus.com/?query=CVE-2018-8013");
    });
  });
});
