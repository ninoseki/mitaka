import "mocha";

import { expect } from "chai";

import { NVD } from "../../src/lib/searcher";

describe("NVD", function () {
  const subject = new NVD();

  it("should support CVE type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", function () {
    it("should return URL", function () {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal(
        "https://nvd.nist.gov/vuln/detail/CVE-2018-8013"
      );
    });
  });
});
