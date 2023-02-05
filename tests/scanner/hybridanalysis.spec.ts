import { HybridAnalysis } from "@/scanner";

describe("HybridAnalysis", function () {
  const subject = new HybridAnalysis();

  it("should support url", function () {
    expect(subject.supportedTypes).toEqual(["url"]);
  });
});
