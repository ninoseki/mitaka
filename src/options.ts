import Mustache from "mustache";
import { browser } from "webextension-polyfill-ts";

import { ApiKeys, GeneralSettings, SearcherStates } from "@/types";
import {
  getApiKeys,
  getGeneralSettings,
  getSearcherStateList,
} from "@/utility";

require("./options/bulma.scss");

export async function saveApiKeys(): Promise<void> {
  const hybridAnalysisApiKey = document.getElementById(
    "hybridanalysis-api-key"
  ) as HTMLInputElement;
  const urlscanApiKey = document.getElementById(
    "urlscan-api-key"
  ) as HTMLInputElement;
  const virusTotalApiKey = document.getElementById(
    "virustotal-api-key"
  ) as HTMLInputElement;

  const apiKeys: ApiKeys = {
    hybridAnalysisApiKey: hybridAnalysisApiKey.value,
    urlscanApiKey: urlscanApiKey.value,
    virusTotalApiKey: virusTotalApiKey.value,
  };
  await browser.storage.sync.set({ apiKeys });
}

export async function saveSearcherStates(): Promise<void> {
  const searcherStates: SearcherStates = {};
  const searcherList = document.getElementById("searcher-list") as HTMLElement;
  const radios =
    searcherList.querySelectorAll<HTMLInputElement>('[type="checkbox"]');
  for (const radio of radios) {
    const name = radio.getAttribute("name");
    if (name === null) {
      continue;
    }
    searcherStates[name] = radio.checked;
  }
  await browser.storage.sync.set({ searcherStates });
}

export async function saveGeneralSettings(): Promise<void> {
  const enableIDNInput = document.getElementById(
    "enable-idn"
  ) as HTMLInputElement;
  const strictTLDInput = document.getElementById(
    "strict-tld"
  ) as HTMLInputElement;
  const enableRefangInput = document.getElementById(
    "enable-refang"
  ) as HTMLInputElement;
  const preferHrefValueInput = document.getElementById(
    "prefer-href-value"
  ) as HTMLInputElement;

  console.log(preferHrefValueInput.checked);

  const generalSettings: GeneralSettings = {
    enableIDN: enableIDNInput.checked,
    strictTLD: strictTLDInput.checked,
    enableRefang: enableRefangInput.checked,
    preferHrefValue: preferHrefValueInput.checked,
  };

  await browser.storage.sync.set({ generalSettings });
}

// Saves options to chrome.storage.sync.
export async function saveOptions(): Promise<void> {
  await saveApiKeys();
  await saveSearcherStates();
  await saveGeneralSettings();
}

export async function restoreApiKeys(): Promise<void> {
  const hybridAnalysisApiKey = document.getElementById(
    "hybridanalysis-api-key"
  ) as HTMLInputElement;
  const urlscanApiKey = document.getElementById(
    "urlscan-api-key"
  ) as HTMLInputElement;
  const virusTotalApiKey = document.getElementById(
    "virustotal-api-key"
  ) as HTMLInputElement;

  const apiKeys = await getApiKeys();
  if (apiKeys.hybridAnalysisApiKey) {
    hybridAnalysisApiKey.value = apiKeys.hybridAnalysisApiKey;
  }
  if (apiKeys.urlscanApiKey) {
    urlscanApiKey.value = apiKeys.urlscanApiKey;
  }
  if (apiKeys.virusTotalApiKey) {
    virusTotalApiKey.value = apiKeys.virusTotalApiKey;
  }
}

export async function restoreSearcherStates(): Promise<void> {
  const states = await getSearcherStateList();

  const searcherList = document.getElementById("searcher-list") as HTMLElement;
  const fragment: DocumentFragment = document.createDocumentFragment();
  const template = (document.getElementById("check-template") as HTMLElement)
    .innerHTML;

  for (const state of states) {
    const elem = document.createElement("div");
    elem.className = "searcher";
    elem.innerHTML = Mustache.render(template, state);
    fragment.appendChild(elem);
  }
  searcherList.appendChild(fragment);
}

export async function restoreGeneralSettings(): Promise<void> {
  const generalSettings = await getGeneralSettings();

  const generalSettingsWrapper = document.getElementById(
    "general-settings"
  ) as HTMLElement;
  const fragment: DocumentFragment = document.createDocumentFragment();
  const template = (
    document.getElementById("general-settings-template") as HTMLElement
  ).innerHTML;

  const elem = document.createElement("div");
  console.log(generalSettings);
  elem.innerHTML = Mustache.render(template, generalSettings);
  fragment.appendChild(elem);

  generalSettingsWrapper.appendChild(fragment);
}

export async function restoreOptions(): Promise<void> {
  await restoreApiKeys();
  await restoreSearcherStates();
  await restoreGeneralSettings();
}

export async function onDOMContentLoaded(): Promise<void> {
  await restoreOptions();

  const inputs = document.getElementsByTagName("input");
  for (const input of inputs) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    input.addEventListener("change", async () => {
      await saveOptions();
    });
  }
}

if (typeof document !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  document.addEventListener("DOMContentLoaded", async () => {
    await onDOMContentLoaded();
  });
}
