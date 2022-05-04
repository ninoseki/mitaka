import { browser } from "webextension-polyfill-ts";

import { Searchers } from "@/searcher";
import {
  ApiKeys,
  Config,
  GeneralSettings,
  SearcherState,
  SearcherStates,
} from "@/types";

interface StorageValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [s: string]: any;
}

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

function convertToGeneralSettings(value: StorageValue): GeneralSettings {
  const hasGeneralSettings: boolean = "generalSettings" in value;
  const generalSettings: GeneralSettings = {
    enableIDN: false,
    strictTLD: false,
    enableRefang: false,
  };

  if (hasGeneralSettings) {
    const _generalSettings = <GeneralSettings>value["generalSettings"];
    generalSettings.enableIDN =
      _generalSettings.enableIDN || generalSettings.enableIDN;
    generalSettings.strictTLD =
      _generalSettings.strictTLD || generalSettings.strictTLD;
    generalSettings.enableRefang =
      _generalSettings.enableRefang || generalSettings.enableRefang;
  }
  return generalSettings;
}

function convertToSearcherStates(value: StorageValue): SearcherStates {
  const hasSearcherStates: boolean = "searcherStates" in value;
  if (hasSearcherStates) {
    return <SearcherStates>value["searcherStates"];
  }
  return {};
}

export async function getConfig(): Promise<Config> {
  const config = await browser.storage.sync.get([
    "searcherStates",
    "generalSettings",
  ]);

  const generalSettings = convertToGeneralSettings(config || {});
  const searcherStates = convertToSearcherStates(config || {});

  return { searcherStates: searcherStates, generalSettings: generalSettings };
}

export async function getSearcherStates(): Promise<SearcherStates> {
  const config = await browser.storage.sync.get("searcherStates");
  return convertToSearcherStates(config || {});
}

export function getFaviconURL(baseURL: string): string {
  return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${baseURL}&size=16`;
}

export async function getSearcherStateList(): Promise<SearcherState[]> {
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
      joinedSupportedTypes: searcher.supportedTypes.join(", "),
      faviconURL: getFaviconURL(searcher.baseURL),
    });
  }
  return states;
}

export async function getGeneralSettings(): Promise<GeneralSettings> {
  const config = await browser.storage.sync.get("generalSettings");
  return convertToGeneralSettings(config || {});
}

export function extractASNumber(asn: string): string {
  const matches = /\d+$/.exec(asn);
  if (matches !== null && matches[0]) {
    return matches[0];
  }
  return "";
}

export function extractCVENumber(cve: string): string {
  const parts = cve.split("-");
  const numbers = parts.slice(1 - parts.length);
  return numbers.join("-");
}

export function isFirefox(): boolean {
  return (
    typeof navigator !== "undefined" &&
    /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent)
  );
}
