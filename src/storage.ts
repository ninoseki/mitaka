import * as v from "valibot";

import { OptionsSchema, type OptionsType } from "~/schemas";

export async function getOptions(): Promise<OptionsType> {
  // don't use neverthrow here to reduce bundle size
  try {
    const wrapper = await chrome.storage.sync.get("options");
    return v.parse(OptionsSchema, wrapper["options"] || {});
  } catch {
    return v.parse(OptionsSchema, {});
  }
}

export async function setOptions(options: OptionsType): Promise<void> {
  // NOTE: use valibot to convert Proxy object into vanilla JS/TS object
  const parsed = v.parse(OptionsSchema, options);
  await chrome.storage.sync.set({ options: parsed });
}
