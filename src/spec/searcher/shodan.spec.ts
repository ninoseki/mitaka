import { expect } from "chai";
import "mocha";
import { Shodan } from "../../lib/searcher";

describe("Shodan", () => {
  const subject = new Shodan();

  it("should support text type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["text"]);
  });

  describe("#searchByURL", () => {
    it("should return URL", () => {
      expect(subject.searchByText("urlscan.io")).to.equal("https://www.shodan.io/search?query=urlscan.io");
    });
  });
});
