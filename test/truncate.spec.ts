import "mocha";

import { expect } from "chai";

import { truncate } from "@/truncate";

describe("truncate", function () {
  it("truncates a text", function () {
    expect(truncate("foo")).to.eq("foo");
    expect(truncate("12345678912")).to.eq("12345678912");
    expect(truncate("123456789123")).to.eq("123456789123");

    expect(truncate("1234567891234")).to.eq("123456789...");
    expect(truncate("1234567891234").length).to.eq(12);
  });
});
