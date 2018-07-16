import { ApiKeys } from "./lib/scanner";

// Saves options to chrome.storage.sync.
function save_options() {
  const urlscanApiKey = document.getElementById("urlscan-api-key") as HTMLInputElement;
  const virusTotalApiKey = document.getElementById("virustotal-api-key") as HTMLInputElement;
  const apiKeys: ApiKeys = {
    urlscanApiKey: urlscanApiKey.value,
    virusTotalApiKey: virusTotalApiKey.value,
  };
  if (apiKeys) {
    chrome.storage.sync.set({ apiKeys }, () => {
      const status = document.getElementById("status");
      if (status) {
        status.textContent = "Options saved.";
      }
    });
  }
}

function restore_options() {
  const urlscanApiKey = document.getElementById("urlscan-api-key") as HTMLInputElement;
  const virusTotalApiKey = document.getElementById("virustotal-api-key") as HTMLInputElement;
  chrome.storage.sync.get("apiKeys", (config) => {
    if (urlscanApiKey) {
      urlscanApiKey.value = config.apiKeys.urlscanApiKey;
    }
    if (virusTotalApiKey) {
      virusTotalApiKey.value = config.apiKeys.virusTotalApiKey;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  restore_options();
  const save = document.getElementById("save");
  if (save) {
    save.addEventListener("click", save_options);
  }
});
