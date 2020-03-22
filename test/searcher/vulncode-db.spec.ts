import { expect } from "chai";
import "mocha";
import { VulncodeDB } from "../../src/lib/searcher";

describe("VulncodeDB", function () {
  const subject = new VulncodeDB();

  it("should support CVE type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", function () {
    it("should return URL", function () {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal(
        "https://www.vulncode-db.com/CVE-2018-8013"
      );
    });
  });
});
