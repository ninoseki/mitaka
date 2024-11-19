import { JoeSandbox } from "~/searcher";

describe("JoeSandbox", function () {
  const subject = new JoeSandbox();

  it("should support hash", function () {
    expect(subject.supportedTypes).toEqual(["hash"]);
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)._unsafeUnwrap()).toBe(
        `https://www.joesandbox.com/analysis/search?q=${hash}`,
      );
    });
  });
});
