import "mocha";

import { expect } from "chai";

import { TIP } from "../../src/lib/searcher";

describe("TIP", function () {
  const subject = new TIP();

  it("should support IP & domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://threatintelligenceplatform.com/report/1.1.1.1/"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://threatintelligenceplatform.com/report/github.com/"
      );
    });
  });
});
