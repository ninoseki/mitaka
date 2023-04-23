import { Intezer } from "~/searcher";

describe("Intezer", function () {
  const subject = new Intezer();

  it("should support hash", function () {
    expect(subject.supportedTypes).toEqual(["hash"]);
  });

  describe("#searchByHash", function () {
    const hash =
      "794374d3e3bd6f2bb232f61d2922d9dae3f78f864a2941f3b76157f82a3e6017";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).toBe(
        `https://analyze.intezer.com/#/files/${hash}`
      );
    });
  });
});
