import { Urlscan } from './urlscan'

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

function showNotification(message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "./icons/48.png",
    title: "Mitaka",
    message: message
  })
}

function listner(info, tab) {
  let query = normalize(info.linkUrl || info.selectionText)
  switch (info.menuItemId) {
    case "mitaka-search":
      {
        search(query)
        break
      }
    case "mitaka-submit":
      {
        submit(query)
        break
      }
  }
}

function search(query) {
  let normalized = normalize(query)
  let url = `https://urlscan.io/search/#${normalized}`
  chrome.tabs.create({
    url: url
  })
}

function submit(query) {
  chrome.storage.sync.get("apiKey", async function (config) {
    let urlscan = new Urlscan(config.apiKey)
    let res = await urlscan.submit(query).catch(function (e) {
      let message
      if (e.response.status == 401) {
        message = "Please set your API key via the option"
      } else {
        message = e.response.data.description
      }
      showNotification(message)
    })
    if (res) {
      chrome.tabs.create({
        url: res.data.result
      })
    }
  });
}

chrome.contextMenus.onClicked.addListener(listner);

chrome.runtime.onInstalled.addListener(function () {
  let contexts = ["selection", "link"]
  let search = chrome.contextMenus.create({
    title: "Search it on urlscan.io",
    contexts: contexts,
    id: "mitaka-search"
  })
  let submit = chrome.contextMenus.create({
    title: "Scan it on urlscan.io",
    contexts: contexts,
    id: "mitaka-submit"
  })
})
