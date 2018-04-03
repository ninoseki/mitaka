import { Urlscan } from './urlscan';

function normalize(query) {
  try {
    const url = new URL(query);
    let normalized = url.host + url.pathname + url.search + url.hash;
    if (normalized.slice(-1) === '/') {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  } catch (err) {
    return query;
  }
}

function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: './icons/48.png',
    title: 'Mitaka',
    message,
  });
}

function listner(info, tab) {
  const query = normalize(info.linkUrl || info.selectionText);
  switch (info.menuItemId) {
    case 'mitaka-search':
      {
        search(query);
        break;
      }
    case 'mitaka-submit':
      {
        submit(query);
        break;
      }
    case 'mitaka-search-publicwww':
      {
        searchPublicWWW(query);
        break;
      }
    case 'mitaka-search-urlquery':
      {
        searchUrlquery(query);
        break;
      }
  }
}

function searchPublicWWW(query) {
  const encoded = encodeURIComponent(query);
  const url = `https://publicwww.com/websites/${encoded}/`;
  chrome.tabs.create({
    url,
  });
}

function searchUrlquery(query) {
  const encoded = encodeURIComponent(query);
  const url = `http://urlquery.net/search?q=${encoded}`;
  chrome.tabs.create({
    url,
  });
}

function search(query) {
  const normalized = normalize(query);
  const url = `https://urlscan.io/search/#${normalized}`;
  chrome.tabs.create({
    url,
  });
}

function submit(query) {
  chrome.storage.sync.get('apiKey', async (config) => {
    const urlscan = new Urlscan(config.apiKey);
    const res = await urlscan.submit(query).catch((e) => {
      let message;
      if (e.response.status === 401) {
        message = 'Please set your API key via the option';
      } else {
        message = e.response.data.description;
      }
      showNotification(message);
    });
    if (res) {
      chrome.tabs.create({
        url: res.data.result,
      });
    }
  });
}

chrome.contextMenus.onClicked.addListener(listner);

chrome.runtime.onInstalled.addListener(() => {
  const contexts = ['selection', 'link'];

  chrome.contextMenus.create({
    title: 'Search it on urlscan.io',
    id: 'mitaka-search',
    contexts,
  });

  chrome.contextMenus.create({
    title: 'Scan it on urlscan.io',
    id: 'mitaka-submit',
    contexts,
  });

  chrome.contextMenus.create({
    title: 'Search it on PublicWWW',
    id: 'mitaka-search-publicwww',
    contexts,
  });

  chrome.contextMenus.create({
    title: 'Search it on Urlquery',
    id: 'mitaka-search-urlquery',
    contexts,
  });
});
