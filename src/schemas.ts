import * as v from "valibot";

export const SelectorOptionsSchema = v.object({
  strict: v.optional(v.boolean(), false),
  refang: v.optional(v.boolean(), true),
  punycode: v.optional(v.boolean(), false),
  debug: v.optional(v.boolean(), false),
});

export type SelectorOptionsType = v.InferOutput<typeof SelectorOptionsSchema>;

export const urlscanVisibility = v.union([
  v.literal("public"),
  v.literal("unlisted"),
  v.literal("private"),
]);

export type urlscanVisibilityType = v.InferOutput<typeof urlscanVisibility>;

export const OtherOptionsSchema = v.object({
  href: v.optional(v.boolean(), true),
  disabledSearcherNames: v.optional(v.array(v.string()), []),
  disabledScannerNames: v.optional(v.array(v.string()), []),
  hybridAnalysisAPIKey: v.optional(v.string()),
  urlscanAPIKey: v.optional(v.string()),
  urlscanVisibility: v.optional(urlscanVisibility, "public"),
  virusTotalAPIKey: v.optional(v.string()),
});

export const OptionsSchema = v.object({
  ...SelectorOptionsSchema.entries,
  ...OtherOptionsSchema.entries,
});

export type OptionsType = v.InferOutput<typeof OptionsSchema>;

export const Searchable = v.union([
  v.literal("asn"),
  v.literal("btc"),
  v.literal("cve"),
  v.literal("domain"),
  v.literal("email"),
  v.literal("eth"),
  v.literal("gaPubID"),
  v.literal("gaTrackID"),
  v.literal("hash"),
  v.literal("ip"),
  v.literal("url"),
]);
export type SearchableType = v.InferOutput<typeof Searchable>;

export const CommandAction = v.union([v.literal("scan"), v.literal("search")]);
export type CommandActionType = v.InferOutput<typeof CommandAction>;

export const CommandSchema = v.object({
  action: CommandAction,
  query: v.string(),
  type: Searchable,
  name: v.string(),
});

export type CommandType = v.InferOutput<typeof CommandSchema>;
