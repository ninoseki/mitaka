import "mocha";

import { expect } from "chai";

import { CommandPacker } from "@/command/packer";

describe("CommandPacker", function () {
  describe("#getMessage()", function () {
    it("should return a string", function () {
      const packer = new CommandPacker("search", "1.1.1.1", "ip", "Urlscan");
      expect(packer.getMessage()).to.equal("Search 1.1.1.1 as IP on Urlscan");
    });
  });
});
