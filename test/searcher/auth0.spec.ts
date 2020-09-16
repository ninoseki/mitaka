import "mocha";

import { expect } from "chai";

import { Auth0 } from "../../src/lib/searcher";

describe("Auth0", function () {
  const subject = new Auth0();

  it("should support ip", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://auth0.com/signals/ip/${ip}-report`
      );
    });
  });
});
