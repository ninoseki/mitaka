import { ResultAsync } from "neverthrow";
import * as v from "valibot";

import { OptionsSchema, type OptionsType } from "~/schemas";

export async function getOptions(): Promise<OptionsType> {
  const getOptionsWrapper = async () => {
    return await chrome.storage.sync.get("options");
  };
  const result = ResultAsync.fromPromise(getOptionsWrapper(), (e) => e);
  const options = (await result)
    .map((wrapper) => wrapper["options"] || {})
    .unwrapOr({});
  return v.parse(OptionsSchema, options);
}

export async function setOptions(options: OptionsType): Promise<void> {
  await chrome.storage.sync.set({
    options: {
      debug: options.debug,
      strict: options.strict,
      punycode: options.punycode,
      refang: options.refang,
      href: options.href,
      disabledSearcherNames: options.disabledSearcherNames.map((n) => n),
      disabledScannerNames: options.disabledScannerNames.map((n) => n),
      hybridAnalysisAPIKey: options.hybridAnalysisAPIKey,
      urlscanAPIKey: options.urlscanAPIKey,
      virusTotalAPIKey: options.virusTotalAPIKey,
    },
  });
}
