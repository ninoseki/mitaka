import { AnyRun } from "@/searcher";

describe("AnyRun", function () {
  const subject = new AnyRun();

  it("should support hash", function () {
    expect(subject.supportedTypes).toEqual(["hash"]);
  });

  describe("#searchByHash", function () {
    it("should return a URL", function () {
      const hash = "8a8f93a0a4e4a709d73695accb2af068";
      expect(subject.searchByHash(hash)).toBe(
        `https://app.any.run/submissions/#filehash:${hash}`
      );
    });
  });
});
