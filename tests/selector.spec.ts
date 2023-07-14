import { Selector } from "~/selector";
import { isScanner, isSearcher } from "~/utils";

describe("Selector", function () {
  describe("ip", function () {
    const ip = "1.1.1.1";
    const selector: Selector = new Selector(ip);

    describe("#getIP", function () {
      it("should return the ip", function () {
        expect(selector.getIP()).toBe(ip);
      });
    });

    describe("#getSlots", function () {
      it("should have IP type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("ip"));
      });
    });
  });

  describe("domain", function () {
    const domain = "github.com";
    const selector: Selector = new Selector(domain);

    describe("#getDomain", function () {
      it("should return the domain", function () {
        expect(selector.getDomain()).toBe(domain);
        expect(selector.getURL()).toBe(null);
      });
    });

    describe("#getSlots", function () {
      it("should have domain type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("domain"));
      });
    });
  });

  describe("url", function () {
    const url = "http://github.com";
    const selector: Selector = new Selector(url);

    describe("#getURL", function () {
      it("should return the url", function () {
        expect(selector.getURL()).toBe(url);
      });
    });

    describe("#getSlots", function () {
      it("should have URL type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("url"));
      });
    });
  });

  describe("email", function () {
    const email = "test@test.com";
    const selector: Selector = new Selector(email);

    describe("#getEmail", function () {
      it("should return the email", function () {
        expect(selector.getEmail()).toBe(email);
      });
    });

    describe("#getSlots", function () {
      it("should have email type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => {
          if (isSearcher(slot.analyzer)) {
            expect(slot.type).toBe("email");
          }
          if (isScanner(slot)) {
            expect(slot.type).toBe("domain");
          }
        });
      });
    });
  });

  describe("asn", function () {
    const asn = "ASN15169";
    const selector: Selector = new Selector(asn);

    describe("#getASN", function () {
      it("should return the asn", function () {
        expect(selector.getASN()).toBe(asn);
      });
    });

    describe("#getSlots", function () {
      it("should have ASN type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("asn"));
      });
    });
  });

  describe("hash", function () {
    const sha256 =
      "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f";
    const selector: Selector = new Selector(sha256);

    describe("#getHash", function () {
      it("should return SHA256", function () {
        expect(selector.getHash()).toBe(sha256);

        // additional tests
        const s2: Selector = new Selector(
          "3395856ce81f2b7382dee72602f798b642f14140",
        );
        expect(s2.getHash()).toBe("3395856ce81f2b7382dee72602f798b642f14140");
        const s3: Selector = new Selector("44d88612fea8a8f36de82e1278abb02f");
        expect(s3.getHash()).toBe("44d88612fea8a8f36de82e1278abb02f");
      });
    });

    describe("#getSlots", function () {
      it("should have hash type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("hash"));
      });
    });
  });

  describe("cve", function () {
    const cve = "CVE-2018-8013";
    const selector: Selector = new Selector(cve);

    describe("#getCVE", function () {
      it("should return CVE", function () {
        expect(selector.getCVE()).toBe(cve);
      });
    });

    describe("#getSlots", function () {
      it("should have CVE type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("cve"));
      });
    });
  });

  describe("btc", function () {
    const btc = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    const selector: Selector = new Selector(btc);

    describe("#getBTC", function () {
      it("should return BTC", function () {
        expect(selector.getBTC()).toBe(btc);
      });
    });

    describe("#getSlots", function () {
      it("should have BTC type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("btc"));
      });
    });
  });

  describe("gaTrackID", function () {
    const id = "UA-67609351-1";
    const selector: Selector = new Selector(id);

    describe("#getGATrackID", function () {
      it("should return GATrackID", function () {
        expect(selector.getGATrackID()).toBe(id);
      });
    });

    describe("#getSlots", function () {
      it("should have GA track ID type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("gaTrackID"));
      });
    });
  });

  describe("gaPubID", function () {
    const id = "pub-9383614236930773";
    const selector: Selector = new Selector(id);

    describe("#getGAPubID", function () {
      it("should return GAPubID", function () {
        expect(selector.getGAPubID()).toBe(id);
      });
    });

    describe("#getSlots", function () {
      it("should have GA pub ID type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("gaPubID"));
      });
    });
  });

  describe("eth", function () {
    const eth = "0x4966db520b0680fc19df5d7774ca96f42e6abd4f";
    const selector: Selector = new Selector(eth);

    describe("#getETH", function () {
      it("should return ETH address", function () {
        expect(selector.getETH()).toBe(eth);
      });
    });

    describe("#getSlots", function () {
      it("should have ETH type slots", function () {
        const slots = selector.getSlots();
        slots.forEach((slot) => expect(slot.type).toBe("eth"));
      });
    });
  });

  describe("without refang", function () {
    const ip = "1[.]1.1.1";

    const selector: Selector = new Selector(ip, {
      enableIDN: true,
      strictTLD: true,
      enableRefang: false,
      enableDebugLog: false,
      disabledSearcherNames: [],
      disabledScannerNames: [],
    });

    describe("#getIP", function () {
      it("should return null", function () {
        expect(selector.getIP()).toBe(null);
      });
    });
  });
});
