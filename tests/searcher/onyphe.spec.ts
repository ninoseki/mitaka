import { ONYPHE } from "~/searcher";

describe("ONYPHE", function () {
  const subject = new ONYPHE();

  it("should support ip", function () {
    expect(subject.supportedTypes).toEqual(["ip"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return datascan URL by default", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        "https://search.onyphe.io/search?q=category%3Adatascan+ip%3A1.1.1.1"
      );
    });
    it("should return ctiscan URL when type is ctiscan", function () {
      expect(subject.searchByIP(ip, "ctiscan")._unsafeUnwrap()).toBe(
        "https://search.onyphe.io/search?q=category%3Actiscan+ip.dest%3A1.1.1.1"
      );
    });
  });
});