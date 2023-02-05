import { Malshare } from "@/searcher";

describe("Malshare", function () {
  const subject = new Malshare();

  it("should support hash", function () {
    expect(subject.supportedTypes).toEqual(["hash"]);
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).toBe(
        `https://www.malshare.com/sample.php?action=detail&hash=${hash}`
      );
    });
  });
});
