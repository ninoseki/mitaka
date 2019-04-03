import { expect } from "chai";
import "mocha";
import { GreyNoise } from "../../lib/searcher";

describe("GreyNoise", () => {
  const subject = new GreyNoise();

  it("should support domain & URL type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://viz.greynoise.io/ip/1.1.1.1"
      );
    });
  });
});
