import { expect } from "chai";
import "mocha";
import { VulncodeDB } from "../../src/lib/searcher";

describe("VulncodeDB", () => {
  const subject = new VulncodeDB();

  it("should support CVE type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", () => {
    it("should return URL", () => {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal(
        "https://www.vulncode-db.com/CVE-2018-8013"
      );
    });
  });
});
