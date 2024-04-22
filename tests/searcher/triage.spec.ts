import { Triage } from "~/searcher";

describe("Triage", function () {
  const subject = new Triage();

  it("should support hash and url", function () {
    expect(subject.supportedTypes).toEqual(["hash", "url"]);
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)._unsafeUnwrap()).toBe(
        `https://tria.ge/s?q=${hash}`,
      );
    });
  });

  describe("#searchByURL", function () {
    const url = "http://example.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)._unsafeUnwrap()).toBe(
        "https://tria.ge/s?q=url%3Ahttp%3A%2F%2Fexample.com",
      );
    });
  });
});
