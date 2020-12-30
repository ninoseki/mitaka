import "mocha";

import { expect } from "chai";

import { VulncodeDB } from "@/searcher";

describe("VulncodeDB", function () {
  const subject = new VulncodeDB();

  it("should support cve", function () {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-8013";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).to.equal(
        `https://www.vulncode-db.com/${cve}`
      );
    });
  });
});
