import { ArchiveOrg } from "~/searcher";

describe("ArchiveOrg", function () {
  const subject = new ArchiveOrg();

  it("should support url", function () {
    expect(subject.supportedTypes).toEqual(["url"]);
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).toBe(
        `https://web.archive.org/web/*/${url}`,
      );
    });
  });
});
