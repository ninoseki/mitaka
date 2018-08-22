import { expect } from "chai";
import "mocha";
import { Pulsedive } from "../../lib/searcher";

describe("Pulsedive", () => {
  describe("#searchByIP", () => {
    it("should return URL", () => {
      const pd = new Pulsedive();
      expect(pd.searchByIP("1.1.1.1")).to.equal("https://pulsedive.com/indicator/?ioc=MS4xLjEuMQ==");
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      const pd = new Pulsedive();
      expect(pd.searchByDomain("github.com")).to.equal("https://pulsedive.com/indicator/?ioc=Z2l0aHViLmNvbQ==");
    });
  });
  describe("#searchByURL", () => {
    it("should return URL", () => {
      const pd = new Pulsedive();
      expect(pd.searchByURL("https://github.com")).to.equal("https://pulsedive.com/indicator/?ioc=aHR0cHM6Ly9naXRodWIuY29t");
    });
  });
  describe("#searchByHash", () => {
    it("should return URL", () => {
      const pd = new Pulsedive();
      expect(pd.searchByHash("726a2eedb9df3d63ec1b4a7d774a799901f1a2b9")).to.equal(
        "https://pulsedive.com/indicator/?ioc=NzI2YTJlZWRiOWRmM2Q2M2VjMWI0YTdkNzc0YTc5OTkwMWYxYTJiOQ=="
      );
    });
  });
});
