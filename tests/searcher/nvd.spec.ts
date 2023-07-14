import { NVD } from "~/searcher";

describe("NVD", function () {
  const subject = new NVD();

  it("should support cve", function () {
    expect(subject.supportedTypes).toEqual(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-8013";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).toBe(
        `https://nvd.nist.gov/vuln/detail/${cve}`,
      );
    });
  });
});
