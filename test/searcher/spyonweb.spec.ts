import { expect } from "chai";
import "mocha";
import { SpyOnWeb } from "../../src/lib/searcher";

describe("SpyOnWeb", () => {
  const subject = new SpyOnWeb();

  it("should support IP, Domain, gaPubID & gaTrackID type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "gaPubID",
      "gaTrackID",
    ]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.eq(
        "http://spyonweb.com/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.eq(
        "http://spyonweb.com/github.com"
      );
    });
  });

  describe("#searchByGAPubID", () => {
    it("should return URL", () => {
      expect(subject.searchByGAPubID("pub-7232066202917795")).to.eq(
        "http://spyonweb.com/pub-7232066202917795"
      );
    });
  });

  describe("#searchByGATrackID", () => {
    it("should return URL", () => {
      expect(subject.searchByGATrackID("ua-67609351-1")).to.eq(
        "http://spyonweb.com/ua-67609351-1"
      );
    });
  });
});
