import "mocha";

import { expect } from "chai";
import moxios from "moxios";

import { CommandPacker } from "@/command/packer";
import { CommandRunner } from "@/command/runner";
import { ApiKeys } from "@/types";

describe("Command", function () {
  describe("#constructor", function () {
    it("should return attributes", function () {
      const packer = new CommandPacker(
        "search",
        "https://github.com",
        "url",
        "Urlscan"
      );
      const runner = new CommandRunner(packer.getJSON());
      expect(runner.command.action).to.equal("search");
      expect(runner.command.query).to.equal("https://github.com");
      expect(runner.command.target).to.equal("Urlscan");
    });
  });

  describe("#search", function () {
    context("ip", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker("search", "1.1.1.1", "ip", "Urlscan");
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal("https://urlscan.io/ip/1.1.1.1");
      });
    });

    context("domain", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "github.com",
          "domain",
          "Urlscan"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal(
          "https://urlscan.io/domain/github.com"
        );
      });
    });

    context("url", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "https://github.com",
          "url",
          "Urlscan"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal(
          "https://urlscan.io/search/#page.url%3A%22https%3A%2F%2Fgithub.com%22%20OR%20task.url%3A%22https%3A%2F%2Fgithub.com%22"
        );
      });
    });

    context("hash", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "726a2eedb9df3d63ec1b4a7d774a799901f1a2b9",
          "hash",
          "Pulsedive"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal(
          "https://pulsedive.com/indicator/?ioc=NzI2YTJlZWRiOWRmM2Q2M2VjMWI0YTdkNzc0YTc5OTkwMWYxYTJiOQ=="
        );
      });
    });

    context("email", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "test@test.com",
          "email",
          "ViewDNS"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal(
          "https://viewdns.info/reversewhois/?q=test%40test.com"
        );
      });
    });

    context("cve", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "CVE-2018-16384",
          "cve",
          "Vulmon"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal(
          "https://vulmon.com/vulnerabilitydetails?qid=CVE-2018-16384"
        );
      });
    });

    context("btc", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
          "btc",
          "BlockCypher"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal(
          "https://live.blockcypher.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/"
        );
      });
    });

    context("gaTrackID", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "UA-67609351",
          "gaTrackID",
          "SpyOnWeb"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal("http://spyonweb.com/UA-67609351");
      });
    });

    context("gaPubID", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "pub-9383614236930773",
          "gaPubID",
          "SpyOnWeb"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal(
          "http://spyonweb.com/pub-9383614236930773"
        );
      });
    });

    context("eth", function () {
      it("should return a URL for search", function () {
        const packer = new CommandPacker(
          "search",
          "0x4966db520b0680fc19df5d7774ca96f42e6abd4f",
          "eth",
          "Blockchair"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(runner.search()).to.equal(
          "https://blockchair.com/ethereum/address/0x4966db520b0680fc19df5d7774ca96f42e6abd4f"
        );
      });
    });
  });

  describe("#searchAll", function () {
    context("ip", function () {
      it("should return URLs", function () {
        const states = {
          Urlscan: true,
          VirusTotal: true,
        };

        const packer = new CommandPacker("search", "1.1.1.1", "ip", "all");
        const runner = new CommandRunner(packer.getJSON());
        const urls = runner.searchAll(states);
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
        const packer = new CommandPacker("scan", "1.1.1.1", "ip", "Urlscan");
        const runner = new CommandRunner(packer.getJSON());
        expect(await runner.scan(apiKeys)).to.equal(
          "https://urlscan.io/entry/foo/loading"
        );
      });
    });

    context("domain", function () {
      it("should return a URL", async function () {
        const packer = new CommandPacker(
          "scan",
          "github.com",
          "domain",
          "Urlscan"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(await runner.scan(apiKeys)).to.equal(
          "https://urlscan.io/entry/foo/loading"
        );
      });
    });

    context("url", function () {
      it("should return a URL for scan", async function () {
        const packer = new CommandPacker(
          "scan",
          "https://www.wikipedia.org/",
          "url",
          "Urlscan"
        );
        const runner = new CommandRunner(packer.getJSON());
        expect(await runner.scan(apiKeys)).to.equal(
          "https://urlscan.io/entry/foo/loading"
        );
      });
    });
  });
});
