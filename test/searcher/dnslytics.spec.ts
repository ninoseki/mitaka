import { expect } from "chai";
import "mocha";
import { DNSlytics } from "../../src/lib/searcher";

describe("DNSlytics", () => {
  const subject = new DNSlytics();

  it("should support IP & Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://dnslytics.com/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://dnslytics.com/domain/github.com"
      );
    });
  });
});
