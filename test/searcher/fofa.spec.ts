import { expect } from "chai";
import "mocha";
import { FOFA } from "../../src/lib/searcher";

describe("FOFA", function () {
  const subject = new FOFA();

  it("should support IP & Domain type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://fofa.so/result?qbase64=aXA9IjEuMS4xLjEi"
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://fofa.so/result?qbase64=ZG9tYWluPSJnaXRodWIuY29tIg%3D%3D"
      );
    });
  });
});
