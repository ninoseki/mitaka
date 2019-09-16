import { expect } from "chai";
import "mocha";
import { FOFA } from "../../src/lib/searcher";

describe("FOFA", () => {
  const subject = new FOFA();

  it("should support IP & Domain type IOC", () => {
    expect(subject.supportedTypes).to.deep.equal(["ip", "domain"]);
  });

  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://fofa.so/result?qbase64=aXA9IjEuMS4xLjEi"
      );
    });
  });

  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://fofa.so/result?qbase64=ZG9tYWluPSJnaXRodWIuY29tIg%3D%3D"
      );
    });
  });
});
