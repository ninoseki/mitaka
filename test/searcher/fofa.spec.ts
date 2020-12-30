import "mocha";

import { expect } from "chai";

import { FOFA } from "@/searcher";

describe("FOFA", function () {
  const subject = new FOFA();

  it("should support ip and domain", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should returna  URL", function () {
      expect(subject.searchByIP(ip)).to.equal(
        "https://fofa.so/result?qbase64=aXA9IjEuMS4xLjEi"
      );
    });
  });

  describe("#searchByDomain", function () {
    const domain = "github.com";
    it("should return a URL", function () {
      expect(subject.searchByDomain(domain)).to.equal(
        "https://fofa.so/result?qbase64=ZG9tYWluPSJnaXRodWIuY29tIg%3D%3D"
      );
    });
  });
});
