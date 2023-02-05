import { z } from "zod";

export const OptionsSchema = z.object({
  enableIDN: z.boolean().default(true),
  strictTLD: z.boolean().default(true),
  enableRefang: z.boolean().default(true),
  enableDebugLog: z.boolean().default(false),
  preferHrefValue: z.boolean().default(true),
  disabledSearcherNames: z.array(z.string()).default([]),
  hybridAnalysisAPIKey: z.string().optional(),
  urlscanAPIKey: z.string().optional(),
  virusTotalAPIKey: z.string().optional(),
});

export const SearchableType = z.union([
  z.literal("asn"),
  z.literal("btc"),
  z.literal("cve"),
  z.literal("domain"),
  z.literal("email"),
  z.literal("eth"),
  z.literal("gaPubID"),
  z.literal("gaTrackID"),
  z.literal("hash"),
  z.literal("ip"),
  z.literal("url"),
]);

export const CommandAction = z.union([z.literal("scan"), z.literal("search")]);

export const CommandSchema = z.object({
  action: CommandAction,
  query: z.string(),
  type: SearchableType,
  name: z.string(),
});

export const ErrorMessageSchema = z.object({
  message: z.string().default("Unknown error occurs..."),
});
