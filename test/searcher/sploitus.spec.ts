import { expect } from "chai";
import "mocha";
import { Sploitus } from "../../src/lib/searcher";

describe("Sploitus", () => {
  const subject = new Sploitus();

  it("should support CVE type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", () => {
    it("should return URL", () => {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal(
        "https://sploitus.com/?query=CVE-2018-8013"
      );
    });
  });
});
