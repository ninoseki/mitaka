import { expect } from "chai";
import "mocha";
import { Vulmon } from "../../src/lib/searcher";

describe("Vulmon", () => {
  const subject = new Vulmon();

  it("should support CVE type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", () => {
    it("should return URL", () => {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal(
        "https://vulmon.com/vulnerabilitydetails?qid=CVE-2018-8013"
      );
    });
  });
});
