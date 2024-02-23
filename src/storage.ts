import { ResultAsync } from "neverthrow";

import { OptionsSchema, type OptionsType } from "~/schemas";

export async function getOptions(): Promise<OptionsType> {
  const _getOptions = async () => {
    return (await chrome.storage.sync.get("options"))["options"];
  };

  const result = ResultAsync.fromPromise(
    _getOptions(),
    () => new Error("Storage error"),
  );

  const options = await result.unwrapOr({});
  return OptionsSchema.parse(options);
}

export async function setOptions(options: OptionsType): Promise<void> {
  await chrome.storage.sync.set({ options });
}
