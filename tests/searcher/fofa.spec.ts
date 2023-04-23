import { FOFA } from "~/searcher";

describe("FOFA", function () {
  const subject = new FOFA();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should returna  URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        "https://fofa.so/result?qbase64=aXA9IjEuMS4xLjEi"
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        "https://fofa.so/result?qbase64=ZG9tYWluPSJnaXRodWIuY29tIg%3D%3D"
      );
    });
  });
});
