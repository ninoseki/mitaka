import { expect } from "chai";
import "mocha";
import { ViewDNS } from "../../lib/searcher";

describe("ViewDNS", () => {
  const subject = new ViewDNS();
  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(subject.searchByIP("1.1.1.1")).
        to.equal("https://viewdns.info/reverseip/?t=1&host=1.1.1.1")
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("domain")).not.equal(-1);
      expect(subject.searchByDomain("github.com")).
        to.equal("https://viewdns.info/iphistory/?domain=github.com");
    });
  });
  describe("#searchByEmail", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("email")).not.equal(-1);
      expect(subject.searchByEmail("test@test.com")).
        to.equal("https://viewdns.info/reversewhois/?q=test@test.com");
    });
  });
});
