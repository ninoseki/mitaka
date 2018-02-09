import * as $ from 'jquery';

function restore_options() {
  chrome.storage.sync.get("apiKey", function(config) {
    console.log(config.apiKey)
  });
}

$(restore_options);
