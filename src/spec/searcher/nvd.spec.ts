import { expect } from "chai";
import "mocha";
import { NVD } from "../../lib/searcher";

describe("NVD", () => {
  const subject = new NVD();

  it("should support CVE type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["cve"]);
  });

  describe("#searchByCVE", () => {
    it("should return URL", () => {
      expect(subject.searchByCVE("CVE-2018-8013")).to.equal(
        "https://nvd.nist.gov/vuln/detail/CVE-2018-8013"
      );
    });
  });
});
