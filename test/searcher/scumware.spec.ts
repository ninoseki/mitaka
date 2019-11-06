import { expect } from "chai";
import "mocha";
import { Scumware } from "../../src/lib/searcher";

describe("Crtsh", () => {
  const subject = new Crtsh();

  it("should support Domain, IP, file hash type IOCs", () => {
    expect(subject.supportedTypes).to.deep.equal(["domain", "ip", "hash"]);
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://www.scumware.org/report/github.com"
      );
    });
  });
});
