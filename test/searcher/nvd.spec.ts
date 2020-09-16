import "mocha";

import { expect } from "chai";

import { NVD } from "../../src/lib/searcher";

describe("NVD", function () {
  const subject = new NVD();

  it("should support cve", function () {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-8013";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).to.equal(
        `https://nvd.nist.gov/vuln/detail/${cve}`
      );
    });
  });
});
