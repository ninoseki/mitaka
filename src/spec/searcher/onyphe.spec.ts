import { expect } from "chai";
import "mocha";
import { ONYPHE } from "../../lib/searcher";

describe("ONYPHE", () => {
  const subject = new ONYPHE();
  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(subject.searchByIP("1.1.1.1")).
        to.equal("https://www.onyphe.io/ip/1.1.1.1");
    });
  });
});
