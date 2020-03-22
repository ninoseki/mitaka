import { expect } from "chai";
import "mocha";
import { ViewDNS } from "../../src/lib/searcher";

describe("ViewDNS", function () {
  const subject = new ViewDNS();

  it("should support IP, Domain & Emal type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain", "email"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://viewdns.info/reverseip/?t=1&host=1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://viewdns.info/iphistory/?domain=github.com"
      );
    });
  });

  describe("#searchByEmail", function () {
    it("should return URL", function () {
      expect(subject.searchByEmail("test@test.com")).to.equal(
        "https://viewdns.info/reversewhois/?q=test%40test.com"
      );
    });
  });
});
