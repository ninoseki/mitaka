import { URLScan } from "@/scanner";

describe("URLScan", function () {
  const subject = new URLScan();

  it("should support ip, domain and url", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "url"]);
  });

  describe("when apiKey is undefined", function () {
    it("should raise an error", function () {
      subject.setAPIKey(undefined);
      expect(subject.scanByURL("http://example.com")).rejects.toThrow(Error);
    });
  });
});
