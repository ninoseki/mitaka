// Saves options to chrome.storage.sync.
function save_options() {
  const apiKey = document.getElementById('api-key') as HTMLInputElement;
  if (apiKey) {
    chrome.storage.sync.set({
      apiKey: apiKey.value,
    }, () => {
      const status = document.getElementById('status');
      if (status) {
        status.textContent = 'Options saved.';
      }
    });
  }
}

function restore_options() {
  chrome.storage.sync.get('apiKey', (config) => {
    const apiKey = document.getElementById('api-key') as HTMLInputElement;
    if (apiKey) {
      apiKey.value = config.apiKey;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  restore_options();
  const save = document.getElementById('save');
  if (save) {
    save.addEventListener('click', save_options);
  }
});
