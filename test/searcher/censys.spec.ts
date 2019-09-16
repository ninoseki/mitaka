import { expect } from "chai";
import "mocha";
import { Censys } from "../../src/lib/searcher";

describe("Censys", () => {
  const subject = new Censys();

  it("should support text type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "asn",
      "text",
    ]);
  });

  describe("#searchByText", () => {
    it("should return URL", () => {
      expect(subject.searchByText("urlscan.io")).to.equal(
        "https://censys.io/ipv4?q=urlscan.io"
      );
    });
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://censys.io/ipv4/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://censys.io/domain/github.com"
      );
    });
  });

  describe("#searchByASN", () => {
    it("should return URL", () => {
      expect(subject.searchByASN("AS13335")).to.equal(
        "https://censys.io/ipv4?q=autonomous_system.asn%3A13335"
      );
    });
  });
});
