import { BGPView } from "~/searcher";

describe("BGPView", function () {
  const subject = new BGPView();

  it("should support ip and asn", function () {
    expect(subject.supportedTypes).toEqual(["ip", "asn"]);
  });

  describe("#searchByIP", function () {
    const ip = "1.1.1.1";
    it("should return a URL", function () {
      expect(subject.searchByIP(ip)._unsafeUnwrap()).toBe(
        `https://bgpview.io/ip/${ip}`,
      );
    });
  });

  describe("#searchByASN", function () {
    const asn = "AS13335";
    it("should return a URL", function () {
      expect(subject.searchByASN(asn)._unsafeUnwrap()).toBe(
        "https://bgpview.io/asn/13335",
      );
    });
  });
});
