# Mitaka

[link-cws]: https://chrome.google.com/webstore/detail/mitaka/bfjbejmeoibbdpfdbmbacmefcbannnbg
[link-amo]: https://addons.mozilla.org/en-US/firefox/addon/mitaka/

[![Build Status](https://travis-ci.com/ninoseki/mitaka.svg?branch=master)](https://travis-ci.com/ninoseki/mitaka)
[![CodeFactor](https://www.codefactor.io/repository/github/ninoseki/mitaka/badge)](https://www.codefactor.io/repository/github/ninoseki/mitaka)
[![Coverage Status](https://coveralls.io/repos/github/ninoseki/mitaka/badge.svg)](https://coveralls.io/github/ninoseki/mitaka)

![eyecatch](./examples/eyecatch.png)

Mitaka is a browser extension for OSINT search which can:

- Extract & refang IoC from a selected block of text.
  - E.g. `example[.]com` to `example.com`, `test[at]example.com` to `test@example.com`, `hxxp://example.com` to `http://example.com`, etc.
- Search / scan it on various engines.
  - E.g. VirusTotal, urlscan.io, Censys, Shodan, etc.

## Install

- [Chrome extension][link-cws]
  - [![Chrome Version](https://img.shields.io/chrome-web-store/v/bfjbejmeoibbdpfdbmbacmefcbannnbg.svg)][link-cws] [![Chrome Users](https://img.shields.io/chrome-web-store/users/bfjbejmeoibbdpfdbmbacmefcbannnbg.svg)][link-cws]

- [Firefox add-on][link-amo]
  - [![FF Version](https://img.shields.io/amo/v/mitaka.svg)][link-amo] [![Mozilla Users](https://img.shields.io/amo/users/mitaka)][link-amo]

## Features

### Supported IoCs

| name      | desc.                       | e.g.                                 |
|:----------|:----------------------------|:-------------------------------------|
| text      | Freetext                    | any string(s)                        |
| ip        | IPv4 address                | `8.8.8.8`                            |
| domain    | Domain name                 | `github.com`                         |
| url       | URL                         | `https://github.com`                 |
| email     | Email address               | `test@test.com`                      |
| asn       | ASN                         | `AS13335`                            |
| hash      | md5 / sha1 / sha256         | `44d88612fea8a8f36de82e1278abb02f`   |
| cve       | CVE number                  | `CVE-2018-11776`                     |
| btc       | BTC address                 | `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` |
| gaPubID   | Google Adsense Publisher ID | `pub-9383614236930773`               |
| gaTrackID | Google Analytics Tracker ID | `UA-67609351-1`                      |

### Supported search engines

| name                 | url                                    | supported types                   |
|:---------------------|:---------------------------------------|:----------------------------------|
| AbuseIPDB            | https://www.abuseipdb.com              | ip                                |
| AnyRun               | https://app.any.run                    | hash                              |
| apklab               | https://apklab.io                      | hash (SHA256 only)                |
| archive.org          | https://archive.org                    | url                               |
| archive.today        | http://archive.fo                      | url                               |
| Auth0                | https://auth0.com                      | ip                                |
| BGPView              | https://bgpview.io                     | ip / asn                          |
| BinaryEdge           | https://app.binaryedge.io              | ip / domain                       |
| BitcoinAbuse         | https://www.bitcoinabuse.com           | btc                               |
| BitcoinWhosWhos      | https://bitcoinwhoswho.com             | btc                               |
| Blockchain.com       | https://www.blockchain.com             | btc                               |
| BlockCypher          | https://live.blockcypher.com           | btc                               |
| Censys               | https://censys.io                      | ip / domain / asn / text          |
| crt.sh               | https://crt.sh                         | domain                            |
| DNSlytics            | https://dnslytics.com                  | ip / domain                       |
| DomainBigData        | https://domainbigdata.com              | ip / domain / email               |
| DomainTools          | https://www.domaintools.com            | ip / domain                       |
| DomainWatch          | https://domainwat.ch                   | domain / email                    |
| EmailRep             | https://emailrep.io                    | email                             |
| FOFA                 | https://fofa.so                        | ip / domain                       |
| FortiGuard           | https://fortiguard.com                 | ip / url / cve                    |
| Google Safe Browsing | https://transparencyreport.google.com  | domain / url                      |
| GreyNoise            | https://viz.greynoise.io               | ip / domain / asn                 |
| Hashdd               | https://hashdd.com                     | ip / domain / hash                |
| Hurricane Electric   | https://bgp.he.net/                    | ip / domain / asn                 |
| HybridAnalysis       | https://www.hybrid-analysis.com        | ip / domain / hash                |
| Intelligence X       | https://intelx.io                      | ip / domain / url / email / btc   |
| Intezer              | https://analyze.intezer.com            | hash                              |
| IPinfo               | https://ipinfo.io                      | ip / asn                          |
| IPIP                 | https://en.ipip.net                    | ip / asn                          |
| Joe Sandbox          | https://www.joesandbox.com             | hash                              |
| MalShare             | https://malshare.com                   | hash                              |
| Maltiverse           | https://www.maltiverse.com             | domain / hash                     |
| MalwareBazaar        | https://bazaar.abuse.ch                | hash                              |
| Malwares             | https://www.malwares.com               | hash                              |
| NVD                  | https://nvd.nist.gov                   | cve                               |
| OOCPR                | https://data.occrp.org                 | email                             |
| ONYPHE               | https://www.onyphe.io                  | ip                                |
| OpenTIP              | https://opentip.kaspersky.com          | hash                              |
| OTX                  | https://otx.alienvault.com             | ip / domain / hash                |
| PublicWWW            | https://publicwww.com                  | text                              |
| Pulsedive            | https://pulsedive.com                  | ip / domain / url / hash          |
| RiskIQ               | http://community.riskiq.com            | ip / domain / email / gaTrackID   |
| Robtex               | https://www.robtex.com                 | ip / domain                       |
| Scumware             | https://www.scumware.org               | ip / domain / hash (MD5 only)     |
| SecurityTrails       | https://securitytrails.com             | ip / domain / email               |
| Shodan               | https://www.shodan.io                  | ip / domain / asn                 |
| Sploitus             | https://sploitus.com                   | cve                               |
| SpyOnWeb             | http://spyonweb.com                    | ip / domain / gaPubID / gaTrackID |
| Spyse                | https://spyse.com                      | ip / domain / asn                 |
| Talos                | https://talosintelligence.com          | ip / domain                       |
| ThreatConnect        | https://app.threatconnect.com          | ip / domain / email               |
| ThreatCrowd          | https://www.threatcrowd.org            | ip / domain / email               |
| ThreatMiner          | https://www.threatminer.org            | ip / domain / hash                |
| TIP                  | https://threatintelligenceplatform.com | ip / domain                       |
| URLhaus              | https://urlhaus.abuse.ch               | ip / domain                       |
| Urlscan              | https://urlscan.io                     | ip / domain / asn / url           |
| ViewDNS              | https://viewdns.info                   | ip / domain / email               |
| VirusTotal           | https://www.virustotal.com             | ip / domain / url / hash          |
| VMRay                | https://www.vmray.com                  | hash                              |
| Vulmon               | https://vulmon.com                     | cve                               |
| VulncodeDB           | https://www.vulncode-db.com            | cve                               |
| VxCube               | http://vxcube.com                      | ip / domain / hash                |
| WebAnalyzer          | https://wa-com.com                     | domain                            |
| X-Force Exchange     | https://exchange.xforce.ibmcloud.com   | ip / domain / hash                |
| ZoomEye              | https://www.zoomeye.org                | ip                                |

### Supported scan engines

| name           | url                             | supported types   |
|:---------------|:--------------------------------|:------------------|
| Browserling    | https://www.browserling.com     | url               |
| HybridAnalysis | https://www.hybrid-analysis.com | url               |
| Urlscan        | https://urlscan.io              | ip / domain / url |
| VirusTotal     | https://www.virustotal.com      | url               |

## How to use

This browser extension shows context menus based on a type of IoC you selected and then you can choose what you want to search / scan on.

**Examples:**

!["example"](/examples/1.gif "1.gif")

!["example2"](/examples/2.gif "2.gif")

Also, there is a how-to article about Mitaka which is written by Null Byte.

- [Use Mitaka to Perform In-Browser OSINT to Identify Malware, Sketchy Sites, Shady Emails & More](https://null-byte.wonderhowto.com/how-to/use-mitaka-perform-browser-osint-identify-malware-sketchy-sites-shady-emails-more-0216352/)

**Note:**

Please set your API keys in the options for enabling HybridAnalysis, urlscan.io and VirusTotal scans.

## Options

You can enable / disable a search engine on the options page based on your preference.

!["options.png](/examples/options.png "options.png")

## About Permissons

This browser extension requires the following permissions.

- `Read and change all your data on the websites you visit`:
  - This extension creates context menus dynamically based on what you select on a website.
  - It means this extension requires reading all your data on the websites you visit. (This extension doesn't change anything on the websites)
- `Display notifications`:
  - This extension makes a notification when something goes wrong.

I don't (and will never) collect any information from the users.

## Privacy Policy

- [My privacy policy for the extension](https://ninoseki.github.io/chrome-webstore/privacy-policy/)

## Alternatives or Similar Tools

- [CrowdScrape](https://chrome.google.com/webstore/detail/crowdscrape/jjplaeklnlddpkbbdbnogmppffokemej)
- [Gotanda](https://github.com/HASH1da1/Gotanda)
- [Sputnik](https://github.com/mitchmoser/sputnik)
- [ThreatConnect Integrated Chrome Extension](https://chrome.google.com/webstore/detail/threatconnect-integrated/lblgcphpihpadjdpjgjnnoikjdjcnkbh)
- [ThreatPinch Lookup](https://github.com/cloudtracer/ThreatPinchLookup)
- [VTchromizer](https://chrome.google.com/webstore/detail/vtchromizer/efbjojhplkelaegfbieplglfidafgoka)

## Contribute

Read the [contribution guide](contributing.md) and join the [contributors](https://github.com/ninoseki/mitaka/graphs/contributors).
