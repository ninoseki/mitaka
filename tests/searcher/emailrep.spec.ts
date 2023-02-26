import { EmailRep } from "@/searcher";

describe("EmailRep", function () {
  const subject = new EmailRep();

  it("should support email", function () {
    expect(subject.supportedTypes).toEqual(["email"]);
  });

  describe("#searchByEmail", function () {
    const email = "test@test.com";
    it("should return a URL", function () {
      expect(subject.searchByEmail(email)).toBe(`https://emailrep.io/${email}`);
    });
  });
});
