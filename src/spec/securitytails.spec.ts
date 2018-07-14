import { expect } from "chai";
import "mocha";
import { SecurityTrails } from "../lib/securitytrails";

describe("SecurityTrails", () => {
  const st = new SecurityTrails();
  describe("#searchByIP", () => {
    it("should return URL", () => {
      expect(st.searchByIP("8.8.8.8")).to.equal("https://securitytrails.com/list/ip/8.8.8.8");
    });
  });
  describe("#searchByDomain", () => {
    it("should return URL", () => {
      expect(st.searchByDomain("github.com")).to.equal("https://securitytrails.com/domain/github.com");
    });
  });
  describe("#searchByText", () => {
    it("should return URL", () => {
      expect(st.searchByText("test")).to.equal("https://securitytrails.com/list/keyword/test");
    });
  });
});
