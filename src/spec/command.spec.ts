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
    it("should return a URL for search", () => {
      const command = new Command("Search https://github.com as a url on Urlscan");
      expect(command.search()).to.equal("https://urlscan.io/search/#%22https%3A%2F%2Fgithub.com%22");
    });
  });

  describe("#scan", () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });
    context("urlscan", () => {
      it("should return a URL for scan", async () => {
        const command = new Command("Scan hhttps://www.wikipedia.org/ as a url on Urlscan");
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
        expect(await command.scan(apiKeys)).to.equal("https://urlscan.io/entry/ac04bc14-4efe-439d-b356-8384843daf75/");
      });
    });
    context("virustotal", () => {
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
