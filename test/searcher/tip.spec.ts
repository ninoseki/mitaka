import { expect } from "chai";
import "mocha";
import { TIP } from "../../src/lib/searcher";

describe("TIP", () => {
  const subject = new TIP();

  it("should support IP & domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://threatintelligenceplatform.com/report/1.1.1.1/"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://threatintelligenceplatform.com/report/github.com/"
      );
    });
  });
});
