import { OptionsSchema } from "~/schemas";
import type { Options } from "~/types";

export async function getOptions(): Promise<Options> {
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

  return OptionsSchema.parse(options);
}

export async function setOptions(options: Options): Promise<void> {
  await chrome.storage.sync.set({ options });
}
