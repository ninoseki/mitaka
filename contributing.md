# Contributing

Suggestions and pull requests are highly encouraged! Have a look at the [open issues](https://github.com/ninoseki/mitaka/issuesc).

## Notes

- You will need to be familiar with [npm](https://docs.npmjs.com/getting-started/) and TypeScript to build this extension.
- The extension can be loaded into Chrome or Firefox manually ([See notes below](#loading-into-the-browser))

## Requirements

[Node.js](https://nodejs.org/en/download/) version 14 or later is required.

## Workflow

First clone:

```sh
git clone https://github.com/ninoseki/mitaka
cd mitaka
npm install
```

When working on the extension or checking out branches, use this to have it constantly build your changes:

```sh
npm run watch # Listen to file changes and automatically rebuild
```

Then load or reload it into the browser to see the changes.

## Loading into the browser

Once built, you can [load it manually in Chrome](https://developer.chrome.com/extensions/getstarted) or [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension).
