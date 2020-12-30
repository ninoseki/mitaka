import { expect } from "chai";

import { Browserling } from "@/scanner";

describe("Browserling", function () {
  const subject = new Browserling();

  it("should support url", function () {
    expect(subject.supportedTypes).to.deep.equal(["url"]);
  });

  describe("#scanByURL", function () {
    it("should return a URL", function () {
      const res = subject.scanByURL("http://example.com");
      expect(res).to.equal(
        "https://www.browserling.com/browse/win/7/ie/11/http%3A%2F%2Fexample.com"
      );
    });
  });
});
