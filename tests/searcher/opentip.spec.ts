import { OpenTIP } from "~/searcher";

describe("OpenTIP", function () {
  const subject = new OpenTIP();

  it("should support hash", function () {
    expect(subject.supportedTypes).toEqual(["hash"]);
  });

  describe("#searchByHash", function () {
    const hash = "44d88612fea8a8f36de82e1278abb02f";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)._unsafeUnwrap()).toBe(
        `https://opentip.kaspersky.com/${hash}`,
      );
    });
  });
});
