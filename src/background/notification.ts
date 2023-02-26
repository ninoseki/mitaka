export function showNotification(message: string): void {
  chrome.notifications.create({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Warning.svg/1200px-Warning.svg.png",
    message,
    title: "Mitaka",
    type: "basic",
  });
}
