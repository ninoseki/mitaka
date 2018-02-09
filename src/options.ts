import * as $ from 'jquery';

// Saves options to chrome.storage.sync.
function save_options() {
  var key = $('#api-key').val();
  chrome.storage.sync.set({
    apiKey: key
  }, function() {
    // Update status to let user know options were saved.
    var status = $('#status');
    status.text('Options saved.');
  });
}

function restore_options() {
  chrome.storage.sync.get("apiKey", function(config) {
    $('#api-key').val(config.apiKey)
  });
}

$('#save').click(save_options);
$(restore_options); // document.addEventListener('DOMContentLoaded', restore_options);

