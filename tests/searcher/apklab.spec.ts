import { APKLab } from "~/searcher";

describe("APKLab", function () {
  const subject = new APKLab();

  it("should support hash", function () {
    expect(subject.supportedTypes).toEqual(["hash"]);
  });

  describe("#searchByHash", function () {
    it("should return a URL", function () {
      const hash =
        "c06537ddb8c4b0c5d338b8c6c891305cceadd9845138f7a87a0b277f16654295";
      expect(subject.searchByHash(hash)._unsafeUnwrap()).toBe(
        `https://www.apklab.io/apk.html?hash=${hash}`,
      );
    });

    it("should throw an error", function () {
      const res = subject.searchByHash("foo bar");
      expect(res.isErr()).toBe(true);
    });
  });
});
