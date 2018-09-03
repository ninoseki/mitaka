import { expect } from "chai";
import "mocha";
import { Vulmon } from "../../lib/searcher";

describe("Vulmon", () => {
  describe("#searchByCVE", () => {
    it("should return URL", () => {
      const vulmon = new Vulmon();
      expect(vulmon.searchByCVE("CVE-2018-8013")).to.equal("https://vulmon.com/vulnerabilitydetails?qid=CVE-2018-8013");
    });
  });
});
