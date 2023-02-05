import { Apklab } from "@/searcher";

describe("Apklab", function () {
  const subject = new Apklab();

  it("should support hash", function () {
    expect(subject.supportedTypes).toEqual(["hash"]);
  });

  describe("#searchByHash", function () {
    it("should return a URL", function () {
      const hash =
        "c06537ddb8c4b0c5d338b8c6c891305cceadd9845138f7a87a0b277f16654295";
      expect(subject.searchByHash(hash)).toBe(
        `https://www.apklab.io/apk.html?hash=${hash}`
      );
    });

    it("should throw an error", function () {
      expect(() => subject.searchByHash("foo bar")).toThrow(
        "apklab supports only SHA256 hash"
      );
    });
  });
});
