import { expect } from "chai";
import "mocha";
import { DNSlytics } from "../../src/lib/searcher";

describe("DNSlytics", function() {
  const subject = new DNSlytics();

  it("should support IP & Domain type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function() {
    it("should return URL", function() {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://dnslytics.com/ip/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function() {
    it("should return URL", function() {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://dnslytics.com/domain/github.com"
      );
    });
  });
});
