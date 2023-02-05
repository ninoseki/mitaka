import { Sploitus } from "@/searcher";

describe("Sploitus", function () {
  const subject = new Sploitus();

  it("should support cve", function () {
    expect(subject.supportedTypes).toEqual(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-8013";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).toBe(
        `https://sploitus.com/?query=${cve}`
      );
    });
  });
});
