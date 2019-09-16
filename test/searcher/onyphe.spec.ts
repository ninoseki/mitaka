import { expect } from "chai";
import "mocha";
import { ONYPHE } from "../../src/lib/searcher";

describe("ONYPHE", () => {
  const subject = new ONYPHE();

  it("should support IP type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://www.onyphe.io/ip/1.1.1.1"
      );
    });
  });
});
