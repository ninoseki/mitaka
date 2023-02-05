import { Urlscan } from "@/scanner";

describe("Urlscan", function () {
  const subject = new Urlscan();

  it("should support ip, domain and url", function () {
    expect(subject.supportedTypes).toEqual(["ip", "domain", "url"]);
  });
});
