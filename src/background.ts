
function search(info, tab) {
  let query = info.linkUrl || info.selectionText
  let normalized = normalize(query)
  let url = `https://urlscan.io/search/#${normalized}`
  chrome.tabs.create({ url: url })
}

function normalize(query) {
  try {
    let url = new URL(query)
    let normalized = url.host + url.pathname + url.search + url.hash
    if (normalized.slice(-1) == "/") {
      normalized = normalized.slice(0, -1)
    }
    return normalized
  } catch (err) {
    return query
  }
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
