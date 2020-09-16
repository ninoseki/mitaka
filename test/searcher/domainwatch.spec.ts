import "mocha";

import { expect } from "chai";

import { DomainWatch } from "../../src/lib/searcher";

describe("DomainWatch", function () {
  const subject = new DomainWatch();

  it("should support domain and email", function () {
    expect(subject.supportedTypes).to.deep.equal(["domain", "email"]);
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://domainwat.ch/site/${domain}`
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).to.equal(
        "https://domainwat.ch/search?query=email%3Atest%40test.com&type=whois_raw"
      );
    });
  });
});
