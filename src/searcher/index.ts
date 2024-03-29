import type { Searcher } from "~/types";

import {
  AbuseIPDB,
  AnyRun,
  APKLab,
  ArchiveOrg,
  ArchiveToday,
  BGPView,
  BinaryEdge,
  BitcoinAbuse,
  BlockChain,
  Blockchair,
  BlockCypher,
  Censys,
  CheckPhish,
  Coalition,
  Crtsh,
  DNSlytics,
  DomainTools,
  EmailRep,
  ExploitDatabase,
  FileScan,
  FortiGuard,
  GoogleSafeBrowsing,
  GreyNoise,
  Host,
  HurricaneElectric,
  HybridAnalysis,
  InQuest,
  Intezer,
  IPinfo,
  IPIP,
  JoeSandbox,
  Malshare,
  Maltiverse,
  MalwareBazaar,
  Malwares,
  NVD,
  OCCRP,
  ONYPHE,
  OpenTIP,
  OTX,
  Pulsedive,
  Radar,
  RiskIQ,
  Robtex,
  Scumware,
  SecurityTrails,
  Shodan,
  Sploitus,
  SpyOnWeb,
  Talos,
  ThreatBook,
  ThreatConnect,
  ThreatMiner,
  TIP,
  Triage,
  URLhaus,
  URLScan,
  URLVoid,
  ViewDNS,
  VirusTotal,
  VMRay,
  Vulmon,
  WebCheck,
  XForceExchange,
  ZoomEye,
} from "./index";

export { AbuseIPDB } from "./abuseipdb";
export { All } from "./all";
export { AnyRun } from "./anyrun";
export { APKLab } from "./apklab";
export { ArchiveOrg } from "./archiveorg";
export { ArchiveToday } from "./archivetoday";
export { BGPView } from "./bgpview";
export { BinaryEdge } from "./binaryedge";
export { BitcoinAbuse } from "./bitcoinabuse";
export { BlockChain } from "./blockchain";
export { Blockchair } from "./blockchair";
export { BlockCypher } from "./blockcypher";
export { Censys } from "./censys";
export { CheckPhish } from "./checkphish";
export { Coalition } from "./coalition";
export { Crtsh } from "./crtsh";
export { DNSlytics } from "./dnslytics";
export { DomainBigData } from "./domainbigdata";
export { DomainTools } from "./domaintools";
export { EmailRep } from "./emailrep";
export { ExploitDatabase } from "./exploitdatabase";
export { FileScan } from "./filescan";
export { FOFA } from "./fofa";
export { FortiGuard } from "./fortiguard";
export { GoogleSafeBrowsing } from "./googlesafebrowsing";
export { GreyNoise } from "./greynoise";
export { Host } from "./host";
export { HurricaneElectric } from "./hurricaneelectric";
export { HybridAnalysis } from "./hybridanalysis";
export { InQuest } from "./inquest";
export { IntelligenceX } from "./intelligencex";
export { Intezer } from "./intezer";
export { IPinfo } from "./ipinfo";
export { IPIP } from "./ipip";
export { JoeSandbox } from "./joesandbox";
export { Malshare } from "./malshare";
export { Maltiverse } from "./maltiverse";
export { MalwareBazaar } from "./malwarebazaar";
export { Malwares } from "./malwares";
export { NVD } from "./nvd";
export { OCCRP } from "./occrp";
export { ONYPHE } from "./onyphe";
export { OpenTIP } from "./opentip";
export { OTX } from "./otx";
export { Pulsedive } from "./pulsedive";
export { Radar } from "./radar";
export { RiskIQ } from "./riskiq";
export { Robtex } from "./robtex";
export { Scumware } from "./scumware";
export { SecurityTrails } from "./securitytrails";
export { Shodan } from "./shodan";
export { Sploitus } from "./sploitus";
export { SpyOnWeb } from "./spyonweb";
export { Spyse } from "./spyse";
export { Talos } from "./talos";
export { ThreatBook } from "./threatbook";
export { ThreatConnect } from "./threatconnect";
export { ThreatCrowd } from "./threatcrowd";
export { ThreatMiner } from "./threatminer";
export { TIP } from "./tip";
export { Triage } from "./triage";
export { URLhaus } from "./urlhaus";
export { URLScan } from "./urlscan";
export { URLVoid } from "./urlvoid";
export { ViewDNS } from "./viewdns";
export { VirusTotal } from "./virustotal";
export { VMRay } from "./vmray";
export { Vulmon } from "./vulmon";
export { VxCube } from "./vxcube";
export { WebCheck } from "./webcheck";
export { XForceExchange } from "./xforceExchange";
export { ZoomEye } from "./zoomeye";

export const Searchers: Searcher[] = [
  new AbuseIPDB(),
  new AnyRun(),
  new APKLab(),
  new ArchiveOrg(),
  new ArchiveToday(),
  new BGPView(),
  new BinaryEdge(),
  new BitcoinAbuse(),
  new BlockChain(),
  new Blockchair(),
  new BlockCypher(),
  new Censys(),
  new CheckPhish(),
  new Coalition(),
  new Crtsh(),
  new DNSlytics(),
  new DomainTools(),
  new EmailRep(),
  new ExploitDatabase(),
  new FileScan(),
  new FortiGuard(),
  new GoogleSafeBrowsing(),
  new GreyNoise(),
  new Host(),
  new HurricaneElectric(),
  new HybridAnalysis(),
  new InQuest(),
  new Intezer(),
  new IPinfo(),
  new IPIP(),
  new JoeSandbox(),
  new Malshare(),
  new Maltiverse(),
  new MalwareBazaar(),
  new Malwares(),
  new NVD(),
  new OCCRP(),
  new ONYPHE(),
  new OpenTIP(),
  new OTX(),
  new Pulsedive(),
  new Radar(),
  new RiskIQ(),
  new Robtex(),
  new Scumware(),
  new SecurityTrails(),
  new Shodan(),
  new Sploitus(),
  new SpyOnWeb(),
  new Talos(),
  new ThreatBook(),
  new ThreatConnect(),
  new ThreatMiner(),
  new TIP(),
  new Triage(),
  new URLhaus(),
  new URLScan(),
  new URLVoid(),
  new ViewDNS(),
  new VirusTotal(),
  new VMRay(),
  new Vulmon(),
  new XForceExchange(),
  new ZoomEye(),
  new WebCheck(),
];
