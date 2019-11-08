import { expect } from "chai";
import "mocha";
import { GodaddyWhois } from "../../src/lib/searcher";

describe("GodaddyWhois", () => {
  const subject = new GodaddyWhois();

  it("should support Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("example.com")).to.equal(
        "https://www.godaddy.com/whois/results.aspx?domain=example.com"
      );
    });
  });
});
