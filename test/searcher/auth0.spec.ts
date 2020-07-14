import "mocha";

import { expect } from "chai";

import { Auth0 } from "../../src/lib/searcher";

describe("Auth0", function () {
  const subject = new Auth0();

  it("should support IP type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://auth0.com/signals/ip/1.1.1.1-report"
      );
    });
  });
});
