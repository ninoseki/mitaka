import { expect } from "chai";
import "mocha";
import { Pulsedive } from "../../src/lib/searcher";

describe("Pulsedive", function () {
  const subject = new Pulsedive();

  it("should support IP, Domain, URL & Hash type IOC", function () {
    expect(subject.supportedTypes).to.deep.equal([
      "ip",
      "domain",
      "url",
      "hash",
    ]);
  });

  describe("#searchByIP", function () {
    it("should return URL", function () {
      expect(subject.searchByIP("1.1.1.1")).to.equal(
        "https://pulsedive.com/indicator/?ioc=MS4xLjEuMQ=="
      );
    });
  });

  describe("#searchByDomain", function () {
    it("should return URL", function () {
      expect(subject.searchByDomain("github.com")).to.equal(
        "https://pulsedive.com/indicator/?ioc=Z2l0aHViLmNvbQ=="
      );
    });
  });

  describe("#searchByURL", function () {
    it("should return URL", function () {
      expect(subject.searchByURL("https://github.com")).to.equal(
        "https://pulsedive.com/indicator/?ioc=aHR0cHM6Ly9naXRodWIuY29t"
      );
    });
  });

  describe("#searchByHash", function () {
    it("should return URL", function () {
      expect(
        subject.searchByHash("726a2eedb9df3d63ec1b4a7d774a799901f1a2b9")
      ).to.equal(
        "https://pulsedive.com/indicator/?ioc=NzI2YTJlZWRiOWRmM2Q2M2VjMWI0YTdkNzc0YTc5OTkwMWYxYTJiOQ=="
      );
    });
  });
});
