import { expect } from "chai";
import "mocha";
import { Vulmon } from "../../src/lib/searcher";

describe("Vulmon", function() {
  const subject = new Vulmon();

  it("should support CVE type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", function() {
    it("should return URL", function() {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal(
        "https://vulmon.com/vulnerabilitydetails?qid=CVE-2018-8013"
      );
    });
  });
});
