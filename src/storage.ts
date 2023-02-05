import type { Options } from "@/types";

export async function getOptions(): Promise<Options> {
  // await chrome.storage.sync.clear();

  const defaultOptions: Options = {
    enableIDN: true,
    strictTLD: true,
    enableRefang: true,
    preferHrefValue: true,
    enableDebugLog: false,
    disabledSearcherNames: [],
    hybridAnalysisAPIKey: undefined,
    urlscanAPIKey: undefined,
    virusTotalAPIKey: undefined,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any = {};
  try {
    wrapper = await chrome.storage.sync.get("options");
  } catch (e) {
    console.error(e);
  }

  const options = (() => {
    if (wrapper) {
      return wrapper["options"] || {};
    }
    return {};
  })();

  return { ...defaultOptions, ...options };
}

export async function setOptions(options: Options): Promise<void> {
  await chrome.storage.sync.set({ options });
}
