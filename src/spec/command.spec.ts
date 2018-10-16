import { expect } from "chai";
import "mocha";
import * as moxios from "moxios";
import { Command } from "../lib/command";
import { ApiKeys } from "../lib/scanner";

describe("Command", () => {
  describe("#constructor", () => {
    it("should return attributes", () => {
      const command = new Command("Search https://github.com as a url on Urlscan");
      expect(command.action).to.equal("search");
      expect(command.query).to.equal("https://github.com");
      expect(command.target).to.equal("Urlscan");
    });
  });
  describe("#search", () => {
    context("text", () => {
      it("should return a URL for search", () => {
        const command = new Command("Search 1.1.1.1 as a text on Censys");
        expect(command.search()).to.equal("https://censys.io/ipv4?q=1.1.1.1");
      });
    });
    context("ip", () => {
      it("should return a URL for search", () => {
        const command = new Command("Search 1.1.1.1 as a ip on Urlscan");
        expect(command.search()).to.equal("https://urlscan.io/search/#1.1.1.1");
      });
    });
    context("domain", () => {
      it("should return a URL for search", () => {
        const command = new Command("Search github.com as a domain on Urlscan");
        expect(command.search()).to.equal("https://urlscan.io/search/#github.com");
      });
    });
    context("url", () => {
      it("should return a URL for search", () => {
        const command = new Command("Search https://github.com as a url on Urlscan");
        expect(command.search()).to.equal("https://urlscan.io/search/#%22https%3A%2F%2Fgithub.com%22");
      });
    });
    context("hash", () => {
      it("should return a URL for search", () => {
        const command = new Command("Search 726a2eedb9df3d63ec1b4a7d774a799901f1a2b9 as a hash on Pulsedive");
        expect(command.search()).to.equal("https://pulsedive.com/indicator/?ioc=NzI2YTJlZWRiOWRmM2Q2M2VjMWI0YTdkNzc0YTc5OTkwMWYxYTJiOQ==");
      });
    });
    context("email", () => {
      it("should return a URL for search", () => {
        const command = new Command("Search test@test.com as a email on ViewDNS");
        expect(command.search()).to.equal("https://viewdns.info/reversewhois/?q=test@test.com");
      });
    });
    context("cve", () => {
      it("should return a URL for search", () => {
        const command = new Command("Search CVE-2018-16384 as a cve on Vulmon");
        expect(command.search()).to.equal("https://vulmon.com/vulnerabilitydetails?qid=CVE-2018-16384");
      });
    });
    context("cve", () => {
      it("should return a URL for search", () => {
        const command = new Command("Search 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa as a btc on BlockCypher");
        expect(command.search()).to.equal("https://live.blockcypher.com/btc/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/");
      });
    });
  });

  describe("#scan", () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });
    context("urlscan", () => {
      context("ip", () => {
        it("should return a URL for scan", async () => {
          const command = new Command("Scan 1.1.1.1 as a ip on Urlscan");
          moxios.stubRequest("https://urlscan.io/api/v1/scan/", {
            response: {
              api: "https://urlscan.io/api/v1/entry/ac04bc14-4efe-439d-b356-8384843daf75/",
              message: "Submission successful",
              options: {
                useragent: "OMITTED",
              },
              result: "https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/",
              uuid: "ac04bc14-4efe-439d-b356-8384843daf75",
              visibility: "public",
            },
            status: 200,
          });
          const apiKeys: ApiKeys = {
            urlscanApiKey: "test",
            virusTotalApiKey: "test",
          };
          expect(await command.scan(apiKeys)).to.equal("https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/loading");
        });
      });
      context("domain", () => {
        it("should return a URL for scan", async () => {
          const command = new Command("Scan github.com as a domain on Urlscan");
          moxios.stubRequest("https://urlscan.io/api/v1/scan/", {
            response: {
              api: "https://urlscan.io/api/v1/entry/ac04bc14-4efe-439d-b356-8384843daf75/",
              message: "Submission successful",
              options: {
                useragent: "OMITTED",
              },
              result: "https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/",
              uuid: "ac04bc14-4efe-439d-b356-8384843daf75",
              visibility: "public",
            },
            status: 200,
          });
          const apiKeys: ApiKeys = {
            urlscanApiKey: "test",
            virusTotalApiKey: "test",
          };
          expect(await command.scan(apiKeys)).to.equal("https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/loading");
        });
      })
      context("url", () => {
        it("should return a URL for scan", async () => {
          const command = new Command("Scan https://www.wikipedia.org/ as a url on Urlscan");
          moxios.stubRequest("https://urlscan.io/api/v1/scan/", {
            response: {
              api: "https://urlscan.io/api/v1/entry/ac04bc14-4efe-439d-b356-8384843daf75/",
              message: "Submission successful",
              options: {
                useragent: "OMITTED",
              },
              result: "https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/",
              uuid: "ac04bc14-4efe-439d-b356-8384843daf75",
              visibility: "public",
            },
            status: 200,
          });
          const apiKeys: ApiKeys = {
            urlscanApiKey: "test",
            virusTotalApiKey: "test",
          };
          expect(await command.scan(apiKeys)).to.equal("https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/loading");
        });
      })
    });
    context("virustotal", () => {
      context("url", () => {
        it("should return a URL for scan", async () => {
          const command = new Command("Scan http://www.virustotal.com/ as a url on VirusTotal");
          const path = "/url/1db0ad7dbcec0676710ea0eaacd35d5e471d3e11944d53bcbd31f0cbd11bce31/analysis/1320752364/";
          moxios.stubRequest("https://www.virustotal.com/vtapi/v2/url/scan", {
            response: {
              permalink: `http://www.virustotal.com${path}`,
              response_code: 1,
              scan_date: "2011-11-08 11:39:24",
              scan_id: "1db0ad7dbcec0676710ea0eaacd35d5e471d3e11944d53bcbd31f0cbd11bce31-1320752364",
              url: "http://www.virustotal.com/",
              verbose_msg: "Scan request successfully queued, come back later for the report",
            },
            status: 200,
          });
          const apiKeys: ApiKeys = {
            urlscanApiKey: "test",
            virusTotalApiKey: "test",
          };
          expect(await command.scan(apiKeys)).to.equal(`http://www.virustotal.com${path}`);
        });
      });
    });
  });
});
