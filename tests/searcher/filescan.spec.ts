import { FileScan } from "~/searcher";

describe("FileScan", function () {
  const subject = new FileScan();

  it("should support hash", function () {
    expect(subject.supportedTypes).toEqual(["hash"]);
  });

  describe("#searchByHash", function () {
    const hash =
      "2f7f3a86a868f6c5a85fb12fe028fd254cd9622075b179923187461c72d6aea0";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).toBe(
        "https://www.filescan.io/search-result?query=2f7f3a86a868f6c5a85fb12fe028fd254cd9622075b179923187461c72d6aea0",
      );
    });
  });
});
