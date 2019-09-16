import { expect } from "chai";
import "mocha";
import { Crtsh } from "../../src/lib/searcher";

describe("Crtsh", () => {
  const subject = new Crtsh();

  it("should support Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://crt.sh/?q=github.com"
      );
    });
  });
});
