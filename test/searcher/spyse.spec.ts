import "mocha";

import { expect } from "chai";

import { Spyse } from "@/searcher";

describe("Spyse", function () {
  const subject = new Spyse();

  it("should support ip, domain, asn, cve and email", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "asn",
      "cve",
      "email",
    ]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        `https://spyse.com/target/ip/${ip}`
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        `https://spyse.com/target/domain/${domain}`
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)).to.equal(
        "https://spyse.com/target/as/13335"
      );
    });
  });

  describe("#searchByCVE", function () {
    const cve = "CVE-2018-11776";
    it("should return a URL", function () {
      expect(subject.searchByCVE(cve)).to.equal(
        "https://spyse.com/target/cve/CVE-2018-11776"
      );
    });
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).to.equal(
        "https://spyse.com/search?target=domain&search_params=%5B%7B%22whois_registrant_email%22%3A%7B%22operator%22%3A%22eq%22%2C%22value%22%3A%22test%40test.com%22%7D%7D%5D"
      );
    });
  });
});
