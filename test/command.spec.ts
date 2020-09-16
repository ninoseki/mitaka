import "mocha";

import { expect } from "chai";
import moxios from "moxios";

import { Command } from "../src/lib/command";
import { ApiKeys } from "./lib/types";

describe("Command", function () {
  describe("#constructor", function () {
    it("should return attributes", function () {
      const command = new Command(
        "Search https://github.com as a url on Urlscan"
      );
      expect(command.action).to.equal("search");
      expect(command.query).to.equal("https://github.com");
      expect(command.target).to.equal("Urlscan");
    });
  });

  describe("#search", function () {
    context("text", function () {
      it("should return a URL for search", function () {
        const command = new Command("Search 1.1.1.1 as a text on Censys");
        expect(command.search()).to.equal("https://censys.io/ipv4?q=1.1.1.1");
      });
    });

    context("ip", function () {
      it("should return a URL for search", function () {
        const command = new Command("Search 1.1.1.1 as a ip on Urlscan");
        expect(command.search()).to.equal("https://urlscan.io/ip/1.1.1.1");
      });
    });

    context("domain", function () {
      it("should return a URL for search", function () {
        const command = new Command("Search github.com as a domain on Urlscan");
        expect(command.search()).to.equal(
          "https://urlscan.io/domain/github.com"
        );
      });
    });

    context("url", function () {
      it("should return a URL for search", function () {
        const command = new Command(
          "Search https://github.com as a url on Urlscan"
        );
        expect(command.search()).to.equal(
          "https://urlscan.io/search/#page.url%3A%22https%3A%2F%2Fgithub.com%22%20OR%20task.url%3A%22https%3A%2F%2Fgithub.com%22"
        );
      });
    });

    context("hash", function () {
      it("should return a URL for search", function () {
        const command = new Command(
          "Search 726a2eedb9df3d63ec1b4a7d774a799901f1a2b9 as a hash on Pulsedive"
        );
        expect(command.search()).to.equal(
          "https://pulsedive.com/indicator/?ioc=NzI2YTJlZWRiOWRmM2Q2M2VjMWI0YTdkNzc0YTc5OTkwMWYxYTJiOQ=="
        );
      });
    });

    context("email", function () {
      it("should return a URL for search", function () {
        const command = new Command(
          "Search test@test.com as a email on ViewDNS"
        );
        expect(command.search()).to.equal(
          "https://viewdns.info/reversewhois/?q=test%40test.com"
        );
      });
    });

    context("cve", function () {
      it("should return a URL for search", function () {
        const command = new Command("Search CVE-2018-16384 as a cve on Vulmon");
        expect(command.search()).to.equal(
          "https://vulmon.com/vulnerabilitydetails?qid=CVE-2018-16384"
        );
      });
    });

    context("btc", function () {
      it("should return a URL for search", function () {
        const command = new Command(
          "Search 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa as a btc on BlockCypher"
        );
        expect(command.search()).to.equal(
          "https://live.blockcypher.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/"
        );
      });
    });

    context("gaTrackID", function () {
      it("should return a URL for search", function () {
        const command = new Command(
          "Search UA-67609351 as a gaTrackID on SpyOnWeb"
        );
        expect(command.search()).to.equal("http://spyonweb.com/UA-67609351");
      });
    });

    context("gaPubID", function () {
      it("should return a URL for search", function () {
        const command = new Command(
          "Search pub-9383614236930773 as a gaPubID on SpyOnWeb"
        );
        expect(command.search()).to.equal(
          "http://spyonweb.com/pub-9383614236930773"
        );
      });
    });

    context("eth", function () {
      it("should return a URL for search", function () {
        const command = new Command(
          "Search 0x4966db520b0680fc19df5d7774ca96f42e6abd4f as a eth on Blockchair"
        );
        expect(command.search()).to.equal(
          "https://blockchair.com/ethereum/address/0x4966db520b0680fc19df5d7774ca96f42e6abd4f"
        );
      });
    });
  });

  describe("#searchAll", function () {
    context("ip", function () {
      it("should return URLs", function () {
        const command = new Command("Search 1.1.1.1 as a ip on all");
        const states = {
          Urlscan: true,
          VirusTotal: true,
        };
        const urls = command.searchAll(states);
        expect(urls.length).to.be.greaterThan(0);
        for (const url of urls) {
          expect(url).to.match(/^http/);
        }
      });
    });
  });

  describe("#scan", function () {
    const apiKeys: ApiKeys = {
      hybridAnalysisApiKey: "test",
      urlscanApiKey: "test",
      virusTotalApiKey: "test",
    };

    beforeEach(() => {
      moxios.install();
      moxios.stubRequest("https://urlscan.io/api/v1/scan/", {
        response: {
          result: "https://urlscan.io/entry/foo/",
        },
        status: 200,
      });
    });

    afterEach(() => {
      moxios.uninstall();
    });

    context("ip", function () {
      it("should return a URL", async function () {
        const command = new Command("Scan 1.1.1.1 as a ip on Urlscan");
        expect(await command.scan(apiKeys)).to.equal(
          "https://urlscan.io/entry/foo/loading"
        );
      });
    });

    context("domain", function () {
      it("should return a URL", async function () {
        const command = new Command("Scan github.com as a domain on Urlscan");
        expect(await command.scan(apiKeys)).to.equal(
          "https://urlscan.io/entry/foo/loading"
        );
      });
    });

    context("url", function () {
      it("should return a URL for scan", async function () {
        const command = new Command(
          "Scan https://www.wikipedia.org/ as a url on Urlscan"
        );
        expect(await command.scan(apiKeys)).to.equal(
          "https://urlscan.io/entry/foo/loading"
        );
      });
    });
  });
});
