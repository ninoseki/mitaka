import "mocha";

import { expect } from "chai";

import { ONYPHE } from "../../src/lib/searcher";

describe("ONYPHE", function () {
  const subject = new ONYPHE();

  it("should support IP type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.onyphe.io/summary/ip/1.1.1.1"
      );
    });
  });
});
