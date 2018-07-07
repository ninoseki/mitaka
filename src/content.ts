document.addEventListener('selectionchange', () => {
  const selection: string = window.getSelection().toString().trim();
  chrome.runtime.sendMessage({
    request: 'updateContextMenu',
    target: selection,
  });
});

const links = document.getElementsByTagName('a');
for (const link of links) {
  const RIGHT = 2;
  link.addEventListener('mousedown', (e) => {
    if (e.button === RIGHT) {
      const selection = link.getAttribute('href');
      if (selection !== null) {
        chrome.runtime.sendMessage({
          request: 'updateContextMenu',
          target: selection,
        });
      }
    }
  });
}
