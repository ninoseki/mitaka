import { ZoomEye } from "~/searcher";

describe("ZoomEye", function () {
  const subject = new ZoomEye();

  it("should support ip", function () {
    expect(subject.supportedTypes).toEqual(["ip"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        "https://www.zoomeye.org/searchResult?q=ip%3A%221.1.1.1%22&t=host",
      );
    });
  });
});
