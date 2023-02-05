import { ArchiveToday } from "@/searcher";

describe("ArchiveToday", function () {
  const subject = new ArchiveToday();

  it("should support url", function () {
    expect(subject.supportedTypes).toEqual(["url"]);
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).toBe(`http://archive.fo/${url}`);
    });
  });
});
