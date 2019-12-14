import { HybridAnalysis } from "./hybridanalysis";
import { Urlscan } from "./urlscan";
import { VirusTotal } from "./virustotal";
import { Scanner } from "../types";

export const Scanners: Scanner[] = [
  new HybridAnalysis(),
  new Urlscan(),
  new VirusTotal(),
];
