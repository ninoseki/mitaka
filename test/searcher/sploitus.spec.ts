import { expect } from "chai";
import "mocha";
import { Sploitus } from "../../src/lib/searcher";

describe("Sploitus", function () {
  const subject = new Sploitus();

  it("should support CVE type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", function () {
    it("should return URL", function () {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal(
        "https://sploitus.com/?query=CVE-2018-8013"
      );
    });
  });
});
