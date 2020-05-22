import { Scanner } from "../types";
import { HybridAnalysis } from "./hybridanalysis";
import { Urlscan } from "./urlscan";
import { VirusTotal } from "./virustotal";

export const Scanners: Scanner[] = [
  new HybridAnalysis(),
  new Urlscan(),
  new VirusTotal(),
];
