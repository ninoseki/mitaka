import { Coalition } from "~/searcher";

describe("Coalition", function () {
  const subject = new Coalition();

  it("should support cve", function () {
    expect(subject.supportedTypes).toEqual(["cve"]);
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-8013";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)._unsafeUnwrap()).toBe(
        `https://ess.coalitioninc.com/cve/?id=${cve}`,
      );
    });
  });
});
