import type { Searcher } from "@/types";

import {
  APKLab,
  AbuseIPDB,
  AnyRun,
  ArchiveOrg,
  ArchiveToday,
  BGPView,
  BinaryEdge,
  BitcoinAbuse,
  BitcoinWhosWho,
  BlockChain,
  BlockCypher,
  Blockchair,
  Censys,
  CheckPhish,
  Crtsh,
  DNSlytics,
  DomainTools,
  DomainWatch,
  EmailRep,
  ExploitDatabase,
  FileScan,
  FortiGuard,
  GoogleSafeBrowsing,
  GreyNoise,
  Hashdd,
  HurricaneElectric,
  HybridAnalysis,
  IPIP,
  IPinfo,
  InQuest,
  IntelligenceX,
  Intezer,
  JoeSandbox,
  Malshare,
  Maltiverse,
  MalwareBazaar,
  Malwares,
  NVD,
  OCCRP,
  ONYPHE,
  OTX,
  OpenTIP,
  Pulsedive,
  Radar,
  RiskIQ,
  Robtex,
  Scumware,
  SecurityTrails,
  Shodan,
  Sploitus,
  SpyOnWeb,
  TIP,
  Talos,
  ThreatConnect,
  ThreatMiner,
  Triage,
  URLScan,
  URLVoid,
  URLhaus,
  VMRay,
  ViewDNS,
  VirusTotal,
  Vulmon,
  VulncodeDB,
  XForceExchange,
  ZoomEye,
} from "./index";

export { AbuseIPDB } from "./abuseipdb";
export { AnyRun } from "./anyrun";
export { APKLab } from "./apklab";
export { ArchiveOrg } from "./archiveorg";
export { ArchiveToday } from "./archivetoday";
export { BGPView } from "./bgpview";
export { BinaryEdge } from "./binaryedge";
export { BitcoinAbuse } from "./bitcoinabuse";
export { BitcoinWhosWho } from "./bitcoinwhoswho";
export { BlockChain } from "./blockchain";
export { Blockchair } from "./blockchair";
export { BlockCypher } from "./blockcypher";
export { Censys } from "./censys";
export { CheckPhish } from "./checkphish";
export { Crtsh } from "./crtsh";
export { DNSlytics } from "./dnslytics";
export { DomainBigData } from "./domainbigdata";
export { DomainTools } from "./domaintools";
export { DomainWatch } from "./domainwatch";
export { EmailRep } from "./emailrep";
export { ExploitDatabase } from "./exploitdatabase";
export { FileScan } from "./filescan";
export { FOFA } from "./fofa";
export { FortiGuard } from "./fortiguard";
export { GoogleSafeBrowsing } from "./googlesafebrowsing";
export { GreyNoise } from "./greynoise";
export { Hashdd } from "./hashdd";
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
export { VulncodeDB } from "./vulncodeDB";
export { VxCube } from "./vxcube";
export { WebAnalyzer } from "./webanalyzer";
export { XForceExchange } from "./xforceExchange";
export { ZoomEye } from "./zoomeye";
export { All } from "./all";

export const Searchers: Searcher[] = [
  new AbuseIPDB(),
  new AnyRun(),
  new APKLab(),
  new ArchiveOrg(),
  new ArchiveToday(),
  new BGPView(),
  new BinaryEdge(),
  new BitcoinAbuse(),
  new BitcoinWhosWho(),
  new BlockChain(),
  new Blockchair(),
  new BlockCypher(),
  new Censys(),
  new CheckPhish(),
  new Crtsh(),
  new DNSlytics(),
  new DomainTools(),
  new DomainWatch(),
  new EmailRep(),
  new ExploitDatabase(),
  new FileScan(),
  new FortiGuard(),
  new GoogleSafeBrowsing(),
  new GreyNoise(),
  new Hashdd(),
  new HurricaneElectric(),
  new HybridAnalysis(),
  new InQuest(),
  new IntelligenceX(),
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
  new VulncodeDB(),
  new XForceExchange(),
  new ZoomEye(),
];
