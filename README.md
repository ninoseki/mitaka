# Mitaka

[![Build Status](https://travis-ci.org/ninoseki/mitaka.svg?branch=master)](https://travis-ci.org/ninoseki/mitaka)
[![Maintainability](https://api.codeclimate.com/v1/badges/4a49568bf0bed0b4799a/maintainability)](https://codeclimate.com/github/ninoseki/mitaka/maintainability)

A Chrome Extension which:

- sends a search query to urlscan.io, PublicWWW and VirusTotal
- makes a scan on urlscan.io

via the context menu.

## Download

- https://chrome.google.com/webstore/detail/mitaka/bfjbejmeoibbdpfdbmbacmefcbannnbg

## How to use

Searh a selection / href value.

!["example"](/examples/1.gif "1.gif")

Scan a selection / href value.

!["example2"](/examples/2.gif "2.gif")

**Note:**

- Please set your urlscan.io API key via the option if you want to make a scan.
- Until the scan is finished, the URL will respond with `Not Found / Error code 404`. Please wait a minute and reload it.

## How to build (for developers)

The chrome extension is written in [TypeScript](https://www.typescriptlang.org/) and built by [webpack](https://webpack.js.org/).

TypeScript files will start out in `src` directory, run through the TypeScript compiler, then webpack, and end up in JavaScript files in `dist` directory.

```sh
git clone https://github.com/ninoseki/mitaka.git
cd mitaka
npm install
npm run build
```

Following procedures to load an unpacked exntension are described at https://developer.chrome.com/extensions/getstarted.

## Misc

Mitaka/見たか means "Have you seen it?" in Japanese.
