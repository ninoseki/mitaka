import { expect } from "chai";
import "mocha";
import { BGPView } from "../../lib/searcher";

describe("BGPView", () => {
  const subject = new BGPView();

  it("should support IP type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal("https://bgpview.io/ip/1.1.1.1");
    });
  });
});
