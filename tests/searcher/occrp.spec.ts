import { OCCRP } from "@/searcher";

describe("OCCRP", function () {
  const subject = new OCCRP();

  it("should support email", function () {
    expect(subject.supportedTypes).toEqual(["email"]);
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).toBe(
        "https://data.occrp.org/search?facet=email&filter%3Aemails=test%40test.com"
      );
    });
  });
});
