import type { Scanner } from "~/types";

import { Browserling } from "./browserling";
import { HybridAnalysis } from "./hybridanalysis";
import { URLScan } from "./urlscan";
import { VirusTotal } from "./virustotal";

export { Browserling } from "./browserling";
export { HybridAnalysis } from "./hybridanalysis";
export { URLScan } from "./urlscan";
export { VirusTotal } from "./virustotal";

export const Scanners: Scanner[] = [
  new Browserling(),
  new HybridAnalysis(),
  new URLScan(),
  new VirusTotal(),
];
