import { HybridAnalysis } from "~/scanner";

describe("HybridAnalysis", function () {
  const subject = new HybridAnalysis();

  it("should support url", function () {
    expect(subject.supportedTypes).toEqual(["url"]);
  });

  describe("when apiKey is undefined", function () {
    it("should raise an error", async function () {
      subject.setAPIKey(undefined);
      const res = await subject.scanByURL("http://example.com");
      expect(res.isErr()).toBe(true);
    });
  });
});
