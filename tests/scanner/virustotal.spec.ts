import { VirusTotal } from "~/scanner";

describe("VirusTotal", function () {
  const subject = new VirusTotal();

  it("should support url", function () {
    expect(subject.supportedTypes).toEqual(["url"]);
  });

  describe("when apiKey is undefined", function () {
    it("should raise an error", function () {
      subject.setAPIKey(undefined);
      expect(subject.scanByURL("http://example.com")).rejects.toThrow(Error);
    });
  });
});
