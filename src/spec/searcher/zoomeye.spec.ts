import { expect } from "chai";
import "mocha";
import { ZoomEye } from "../../lib/searcher";

describe("ZoomEye", () => {
  const subject = new ZoomEye();
  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal("https://www.zoomeye.org/searchResult?q=ip%3A%221.1.1.1%22&t=host");
    });
  });
});
