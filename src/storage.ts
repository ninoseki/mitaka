import { ResultAsync } from "neverthrow";

import { OptionsSchema, type OptionsType } from "~/schemas";

export async function getOptions(): Promise<OptionsType> {
  const getOptionsWrapper = async () => {
    return await chrome.storage.sync.get("options");
  };
  const result = ResultAsync.fromPromise(getOptionsWrapper(), (e) => e);
  const options = (await result)
    .map((wrapper) => wrapper["options"] || {})
    .unwrapOr({});
  return OptionsSchema.parse(options);
}

export async function setOptions(options: OptionsType): Promise<void> {
  await chrome.storage.sync.set({ options });
}
