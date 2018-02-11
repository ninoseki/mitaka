// Saves options to chrome.storage.sync.
function save_options() {
  let apiKey = <HTMLInputElement>document.getElementById("api-key")
  if (apiKey) {
    chrome.storage.sync.set({
      apiKey: apiKey.value
    }, function () {
      let status = document.getElementById("status")
      if (status) {
        status.textContent = "Options saved."
      }
    });
  }
}

function restore_options() {
  chrome.storage.sync.get("apiKey", function (config) {
    let apiKey = <HTMLInputElement>document.getElementById("api-key")
    if (apiKey) {
      apiKey.value = config.apiKey
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  restore_options()
  let save = document.getElementById("save")
  if (save) {
    save.addEventListener("click", save_options)
  }
})
