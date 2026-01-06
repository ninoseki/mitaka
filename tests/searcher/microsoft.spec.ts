import { Microsoft } from "~/searcher";

describe("Microsoft", function () {
  const subject = new Microsoft();

  it("should support cve", function () {
    expect(subject.supportedTypes).toEqual(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2025-59230";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)._unsafeUnwrap()).toBe(
        `https://msrc.microsoft.com/update-guide/vulnerability/${cve}`,
      );
    });
  });
});
