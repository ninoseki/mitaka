import "mocha";

import { expect } from "chai";

import { ZoomEye } from "../../src/lib/searcher";

describe("ZoomEye", function () {
  const subject = new ZoomEye();

  it("should support ip", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        "https://www.zoomeye.org/searchResult?q=ip%3A%221.1.1.1%22&t=host"
      );
    });
  });
});
