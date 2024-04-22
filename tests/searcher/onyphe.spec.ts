import { ONYPHE } from "~/searcher";

describe("ONYPHE", function () {
  const subject = new ONYPHE();

  it("should support ip", function () {
    expect(subject.supportedTypes).toEqual(["ip"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://www.onyphe.io/summary/ip/${ip}`,
      );
    });
  });
});
