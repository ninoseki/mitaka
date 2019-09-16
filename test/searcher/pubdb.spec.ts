import { expect } from "chai";
import "mocha";
import { PubDB } from "../../src/lib/searcher";

describe("PubDB", () => {
  const subject = new PubDB();

  it("should support gaPubID & gaTrackID type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["gaTrackID", "gaPubID"]);
  });

  describe("#searchByGATrackID", () => {
    it("should return URL", () => {
      expect(subject.searchByGATrackID("UA-67609351-1")).to.equal(
        "http://pub-db.com/google-analytics/UA-67609351-1.html"
      );
    });
  });

  describe("#searchByGAPubID", () => {
    it("should return URL", () => {
      expect(subject.searchByGAPubID("pub-9383614236930773")).to.equal(
        "http://pub-db.com/adsense/pub-9383614236930773.html"
      );
    });
  });
});
