import { expect } from "chai";
import "mocha";
import { ZoomEye } from "../../src/lib/searcher";

describe("ZoomEye", function() {
  const subject = new ZoomEye();

  it("should support IP type IOC", function() {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", function() {
    it("should return URL", function() {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.zoomeye.org/searchResult?q=ip%3A%221.1.1.1%22&t=host"
      );
    });
  });
});
