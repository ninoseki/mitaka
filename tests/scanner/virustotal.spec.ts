import { VirusTotal } from "@/scanner";

describe("VirusTotal", function () {
  const subject = new VirusTotal();

  it("should support url", function () {
    expect(subject.supportedTypes).toEqual(["url"]);
  });
});
