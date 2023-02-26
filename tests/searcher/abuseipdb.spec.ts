import { AbuseIPDB } from "@/searcher";

describe("AbuseIPDB", function () {
  const subject = new AbuseIPDB();

  it("should support ip", function () {
    expect(subject.supportedTypes).toEqual(["ip"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).toBe(
        `https://www.abuseipdb.com/check/${ip}`
      );
    });
  });
});
