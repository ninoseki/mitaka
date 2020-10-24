import { browser } from "webextension-polyfill-ts";

import { Searchers } from "./lib/searcher";
import {
  ApiKeys,
  GeneralSettings,
  SearcherState,
  SearcherStates,
} from "./lib/types";

export async function getApiKeys(): Promise<ApiKeys> {
  const config = await browser.storage.sync.get("apiKeys");

  const apiKeys: ApiKeys = {
    hybridAnalysisApiKey: undefined,
    urlscanApiKey: undefined,
    virusTotalApiKey: undefined,
  };
  if ("apiKeys" in config) {
    const configKeys = <ApiKeys>config["apiKeys"];
    apiKeys.hybridAnalysisApiKey = configKeys.hybridAnalysisApiKey;
    apiKeys.urlscanApiKey = configKeys.urlscanApiKey;
    apiKeys.virusTotalApiKey = configKeys.virusTotalApiKey;
  }
  return apiKeys;
}

export async function getSearcherStates(): Promise<SearcherState[]> {
  const config = await browser.storage.sync.get("searcherStates");
  const hasSearcherStates: boolean = "searcherStates" in config;
  const states: SearcherState[] = [];

  for (const searcher of Searchers) {
    let isEnabled = true;

    if (hasSearcherStates && searcher.name in config["searcherStates"]) {
      const searcherStates = <SearcherStates>config["searcherStates"];
      isEnabled = searcherStates[searcher.name];
    }
    states.push({
      isEnabled,
      name: searcher.name,
      baseURL: searcher.baseURL,
      supportedTypes: searcher.supportedTypes,
    });
  }
  return states;
}

export async function getGeneralSettings(): Promise<GeneralSettings> {
  const config = await browser.storage.sync.get("generalSettings");

  const hasGeneralSettings: boolean = "generalSettings" in config;
  const generalSettings: GeneralSettings = {
    enableIDN: false,
  };

  if (hasGeneralSettings) {
    const _generalSettings = <GeneralSettings>config["generalSettings"];
    generalSettings.enableIDN = _generalSettings.enableIDN || false;
  }

  return generalSettings;
}
