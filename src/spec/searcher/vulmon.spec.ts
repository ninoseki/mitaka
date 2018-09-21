import { expect } from "chai";
import "mocha";
import { Vulmon } from "../../lib/searcher";

describe("Vulmon", () => {
  const subject = new Vulmon();
  describe("#searchByCVE", () => {
    it("should return URL", () => {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal("https://vulmon.com/vulnerabilitydetails?qid=CVE-2018-8013");
    });
  });
});
