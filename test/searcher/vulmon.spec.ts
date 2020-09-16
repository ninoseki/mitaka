import "mocha";

import { expect } from "chai";

import { Vulmon } from "../../src/lib/searcher";

describe("Vulmon", function () {
  const subject = new Vulmon();

  it("should support cve", function () {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-8013";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).to.equal(
        `https://vulmon.com/vulnerabilitydetails?qid=${cve}`
      );
    });
  });
});
