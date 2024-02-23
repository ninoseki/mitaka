import { z } from "zod";

export const SelectorOptionsSchema = z.object({
  strict: z.boolean().default(false),
  refang: z.boolean().default(true),
  punycode: z.boolean().default(false),
  debug: z.boolean().default(false),
});

export type SelectorOptionsType = z.infer<typeof SelectorOptionsSchema>;

export const OptionsSchema = SelectorOptionsSchema.extend({
  href: z.boolean().default(true),
  disabledSearcherNames: z.array(z.string()).default([]),
  disabledScannerNames: z.array(z.string()).default([]),
  hybridAnalysisAPIKey: z.string().optional(),
  urlscanAPIKey: z.string().optional(),
  virusTotalAPIKey: z.string().optional(),
});

export type OptionsType = z.infer<typeof OptionsSchema>;

export const Searchable = z.union([
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
export type SearchableType = z.infer<typeof Searchable>;

export const CommandAction = z.union([z.literal("scan"), z.literal("search")]);
export type CommandActionType = z.infer<typeof CommandAction>;

export const CommandSchema = z.object({
  action: CommandAction,
  query: z.string(),
  type: Searchable,
  name: z.string(),
});
