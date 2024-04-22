import { URLScan } from "~/searcher";

describe("Urlscan", function () {
  const subject = new URLScan();

  it("should support ip, domain, asn and url", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "asn", "url"]);
  });

  describe("#searchByURL", function () {
    const url = "https://github.com";
    it("should return a URL", function () {
      expect(subject.searchByURL(url)._unsafeUnwrap()).toBe(
        "https://urlscan.io/search/#page.url%3A%22https%3A%2F%2Fgithub.com%22%20OR%20task.url%3A%22https%3A%2F%2Fgithub.com%22",
      );
    });
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://urlscan.io/ip/${ip}`,
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)._unsafeUnwrap()).toBe(
        `https://urlscan.io/domain/${domain}`,
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS24940";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)._unsafeUnwrap()).toBe(
        `https://urlscan.io/asn/${asn}`,
      );
    });
  });
});
