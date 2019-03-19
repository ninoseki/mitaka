import { Scanner } from "./scanner";
import { Urlscan } from "./urlscan";
import { VirusTotal } from "./virustotal";

export const Scanners: Scanner[] = [new Urlscan(), new VirusTotal()];
