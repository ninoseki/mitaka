import "mocha";

import { expect } from "chai";

import { Sploitus } from "../../src/lib/searcher";

describe("Sploitus", function () {
  const subject = new Sploitus();

  it("should support cve", function () {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-8013";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).to.equal(
        `https://sploitus.com/?query=${cve}`
      );
    });
  });
});
