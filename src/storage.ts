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
  // NOTE: use valibot to convert Proxy object into vanilla JS/TS object
  const parsed = v.parse(OptionsSchema, options);
  await chrome.storage.sync.set({ options: parsed });
}
