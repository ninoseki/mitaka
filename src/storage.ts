import * as v from "valibot";

import {
  LocalOptionsSchema,
  OptionsSchema,
  type OptionsType,
  SyncOptionsSchema,
} from "~/schemas";

// use sync storage to store non-sensitive options (key: "options")
// use local storage to store sensitive options (e.g. API key) (key: "localOptions")

const syncStorageOptionsKey = "options";
const localStorageOptionsKey = "localOptions";

export async function getOptions(): Promise<OptionsType> {
  const getSyncOptions = (async () => {
    try {
      const wrapper = await chrome.storage.sync.get(syncStorageOptionsKey);
      return v.parse(SyncOptionsSchema, wrapper[syncStorageOptionsKey] || {});
    } catch {
      return v.parse(SyncOptionsSchema, {});
    }
  })();

  const getLocalOptions = (async () => {
    try {
      const wrapper = await chrome.storage.local.get(localStorageOptionsKey);
      return v.parse(LocalOptionsSchema, wrapper[localStorageOptionsKey] || {});
    } catch {
      return v.parse(LocalOptionsSchema, {});
    }
  })();

  const [syncOptions, localOptions] = await Promise.all([
    getSyncOptions,
    getLocalOptions,
  ]);

  return v.parse(OptionsSchema, { ...syncOptions, ...localOptions });
}

export async function setOptions(options: OptionsType): Promise<void> {
  // NOTE: use valibot to convert Proxy object into vanilla JS/TS object
  const syncOptions = v.parse(SyncOptionsSchema, options);
  const localOptions = v.parse(LocalOptionsSchema, options);

  await Promise.all([
    chrome.storage.sync.set({ [syncStorageOptionsKey]: syncOptions }),
    chrome.storage.local.set({ [localStorageOptionsKey]: localOptions }),
  ]);
}
