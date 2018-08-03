import { expect } from "chai";
import "mocha";
import { ONYPHE } from "../../lib/searcher";

describe("ONYPHE", () => {
  describe("#searchByIP", () => {
    it("should return URL", () => {
      const oneyphe = new ONYPHE();
      expect(oneyphe.supportedTypes.indexOf("ip")).not.equal(-1);
      expect(oneyphe.searchByIP("1.1.1.1")).
        to.equal("https://www.onyphe.io/ip/1.1.1.1");
    });
  });
});
