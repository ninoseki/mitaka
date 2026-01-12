import { MITRE } from "~/searcher";

describe("MITRE", function () {
  const subject = new MITRE();

  it("should support cve", function () {
    expect(subject.supportedTypes).toEqual(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-8013";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)._unsafeUnwrap()).toBe(
        `https://cve.org/CVERecord?id=${cve}`,
      );
    });
  });
});
