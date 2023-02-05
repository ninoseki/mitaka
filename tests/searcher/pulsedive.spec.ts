import { Pulsedive } from "@/searcher";

describe("Pulsedive", function () {
  const subject = new Pulsedive();

  it("should support ip, domain, url and hash", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "url", "hash"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        "https://pulsedive.com/indicator/?ioc=MS4xLjEuMQ=="
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).toBe(
        "https://pulsedive.com/indicator/?ioc=Z2l0aHViLmNvbQ=="
      );
    });
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)).toBe(
        "https://pulsedive.com/indicator/?ioc=aHR0cHM6Ly9naXRodWIuY29t"
      );
    });
  });

  describe("#searchByHash", function () {
    const hash = "726a2eedb9df3d63ec1b4a7d774a799901f1a2b9";
    it("should return a URL", function () {
      expect(subject.searchByHash(hash)).toBe(
        "https://pulsedive.com/indicator/?ioc=NzI2YTJlZWRiOWRmM2Q2M2VjMWI0YTdkNzc0YTc5OTkwMWYxYTJiOQ=="
      );
    });
  });
});
