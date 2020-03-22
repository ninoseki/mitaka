import { expect } from "chai";
import "mocha";
import { SpyOnWeb } from "../../src/lib/searcher";

describe("SpyOnWeb", function () {
  const subject = new SpyOnWeb();

  it("should support IP, Domain, gaPubID & gaTrackID type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "gaPubID",
      "gaTrackID",
    ]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.eq(
        "http://spyonweb.com/1.1.1.1"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.eq(
        "http://spyonweb.com/github.com"
      );
    });
  });

  describe("#searchByGAPubID", function () {
    it("should return URL", function () {
      expect(subject.searchByGAPubID("pub-7232066202917795")).to.eq(
        "http://spyonweb.com/pub-7232066202917795"
      );
    });
  });

  describe("#searchByGATrackID", function () {
    it("should return URL", function () {
      expect(subject.searchByGATrackID("ua-67609351-1")).to.eq(
        "http://spyonweb.com/ua-67609351-1"
      );
    });
  });
});
