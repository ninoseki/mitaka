
function search(info, tab) {
  let query = info.linkUrl || info.selectionText
  var url = `https://urlscan.io/search/#${query}`
  chrome.tabs.create({ url: url })
}

chrome.contextMenus.onClicked.addListener(search);

chrome.runtime.onInstalled.addListener(function () {
  let contexts = ["selection", "link"]
  let title = "Searhc it on urlscan.io"
  let id = chrome.contextMenus.create({
    title: "Search it on urlscan.io",
    contexts: contexts,
    id: "mitaka"
  })
})
