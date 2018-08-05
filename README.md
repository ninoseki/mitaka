# Mitaka

[![Build Status](https://travis-ci.org/ninoseki/mitaka.svg?branch=master)](https://travis-ci.org/ninoseki/mitaka)
[![Maintainability](https://api.codeclimate.com/v1/badges/4a49568bf0bed0b4799a/maintainability)](https://codeclimate.com/github/ninoseki/mitaka/maintainability)

Mitaka is an OSINT friendly IOC (Indicator of Compromise) search tool.

It works as a Chrome extension and it makes possible to search / scan IOC via the context menu.

## Features

### Supported IOC types

| name   | desc.               | eg.                                |
|:-------|:--------------------|:-----------------------------------|
| text   | freetext            | any string(s)                      |
| ip     | IPv4 address        | `8.8.8.8`                          |
| domain | domain name         | `github.com`                       |
| url    | URL                 | `https://github.com`               |
| email  | Email address       | `test@test.com`                    |
| hash   | md5 / sha1 / sha256 | `44d88612fea8a8f36de82e1278abb02f` |

Note: `email` type IOC is used for revese WHOIS lookup.

### Supported search engines

| name             | url                                  | supported types           |
|:-----------------|:-------------------------------------|:--------------------------|
| Censys           | https://censys.io                    | text                      |
| Cymon            | https://cymon.io                     | ip / domain               |
| DomainBigData    | https://domainbigdata.com            | domain                    |
| FindSubDomains   | https://findsubdomains.com           | domain                    |
| HybridAnalysis   | https://www.hybrid-analysis.com      | hash (sha256 only)        |
| ONYPHE           | https://www.onyphe.io                | ip                        |
| PublicWWW        | https://publicwww.com                | text                      |
| Pulsedive        | https://pulsedive.com                | ip / domaion / url / hash |
| RiskIQ           | http://community.riskiq.com          | ip / domain / email       |
| SecurityTrails   | https://securitytrails.com           | ip / domain               |
| Shodan           | https://www.shodan.io                | text                      |
| Urlscan          | https://urlscan.io                   | ip / domain / url         |
| ViewDNS          | https://viewdns.info                 | ip, domain, email         |
| VirusTotal       | https://www.virustotal.com           | ip / domain / url / hash  |
| X-Force Exchange | https://exchange.xforce.ibmcloud.com | ip / domain / hash        |

You can enable / disable a search engine via the extentions's options.

### Supported scan engine

| name       | url                        | supported types   |
|:-----------|:---------------------------|:------------------|
| Urlscan    | https://urlscan.io         | ip / domain / url |
| VirusTotal | https://www.virustotal.com | url               |

## Download

- https://chrome.google.com/webstore/detail/mitaka/bfjbejmeoibbdpfdbmbacmefcbannnbg

## How to use

The Chrome extension shows context menus based on a type of IOC you selected and then you can choose what you want to search / scan on.

**Examples:**

!["example"](/examples/1.gif "1.gif")

---

!["example2"](/examples/2.gif "2.gif")

**Note:**

- urlscan.io scan:
  - Please set your urlscan.io API key via the options if you want to make a scan.
  - Until the scan is finished, the URL will respond with `Not Found / Error code 404`. Please wait a minute and reload it.
- VirusTotal scan:
  - Please set your VirusTotal API key via the options if you want to make a scan.

## Options

You can enable / disalbe a search engine in the options page based on your preference.

!["options.png](/examples/options.png "options.png")

## About Permissons

This Chrome extension requires following permissions.

- `Read and change all your data on the websites you visit`:
  - This extension creates context menus dynamically based on what you select on a website.
  - It measns this extension requires reading all your data on the websites you visit. (This extension doesn't change anything on the websites)
- `Display notifications`:
  - This extension makes a notification when someting goes wrong.

I don't (and will never) collect any information from the users.

## How to build (for developers)

The chrome extension is written in [TypeScript](https://www.typescriptlang.org/) and built by [webpack](https://webpack.js.org/).

TypeScript files will start out in `src` directory, run through the TypeScript compiler, then webpack, and end up in JavaScript files in `dist` directory.

```sh
git clone https://github.com/ninoseki/mitaka.git
cd mitaka
npm install
npm run build
```

Following procedures to load an unpacked exntension are described at https://developer.chrome.com/extensions/getstarted.

## Misc

Mitaka/見たか means "Have you seen it?" in Japanese.
