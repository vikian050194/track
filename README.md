# track

[![MIT license][license-badge]][license-url]
[![Maintenance status][status-badge]][status-url]
[![Code coverage][coverage-badge]][coverage-url]

[![Chrome Web Store version][store-version-badge]][store-version-url]
[![Chrome Web Store rating][store-rating-badge]][store-rating-url]
[![Chrome Web Store rating][store-stars-badge]][store-stars-url]
[![Chrome Web Store users count][store-users-badge]][store-users-url]

## About

**track** is Google Chrome extension for opening task tracker issue without clicking, just recall and type issue number!

## Motivation

There are three general cases when it's necessary to open combined URL:
1. Localhost with project specific port;
2. Issue in task tracker;
3. Source file in repository web view.

According to my experience second is most frequent, but last one is most annoying. First case is rare, but it's covered out-of-box.

## Requirements

Developed and tested on `Version 115.0.5790.170 (Official Build) (64-bit)`

## Installation

**Chrome Web Store**

Just go [here][store-version-url] and click "Add to Chrome"

**From sources**

1. Clone repo `git clone https://github.com/vikian050194/track.git`
2. Create and activate Python virtual environment
3. Install dependencies `pip install -r requirements.txt` and run `python mdConverter.py`
4. Open Chrome and navigate [here](chrome://extensions/)
5. Enable `Developer mode` via toggle
6. `Load unpacked` and select `src` directory of the cloned repo

## Usage

1. Install extension;
2. Go to extensions shortcuts page (chrome://extensions/shortcuts) and re-configure keys combination for activation (if needed);
3. Go to extension options and update it if needed;
4. Go to targets page and add required targets;
5. Activate extension (`Alt+T` by default);
6. Type value for placeholder;
7. Update active tab by pressing `Enter` or open new tab by `Shift+Enter`.

### Configuration

Extension has few options.

You can [setup your own shortcut for activation](chrome://extensions/shortcuts), but default one is `Alt+T` or `Command+T`.

**Appearance**

| Name | Description |
| :--- | :--- |
| Font size | Popup font size in pixels |
| Selected item color | Color of selected item in results list |
| Selected item font weight | Font weight of selected item in results list |
| Arrow pointer | Arrow appears in front of selected item |

**Autoclosing**

| Name | Description |
| :--- | :--- |
| Autoclose enabled | Is popup autoclose enabled |
| Autoclose time | Popup autoclose time in seconds |

## Tests

### Packages

- `mocha` is used for unit testing and `c8` for coverage
- `playwright` is used for e2e testing

### How to run

- `npm test` - run unit tests
- `npm run cover` - run code coverage
- `npm run test:ui` - run e2e tests

[warp-url]: https://github.com/vikian050194/warp

[status-url]: https://github.com/vikian050194/track/pulse
[status-badge]: https://img.shields.io/github/last-commit/vikian050194/track.svg

[license-url]: https://github.com/vikian050194/track/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/vikian050194/track.svg

[coverage-url]: https://codecov.io/gh/vikian050194/track
[coverage-badge]: https://img.shields.io/codecov/c/github/vikian050194/track

[store-version-url]: https://chrome.google.com/webstore/detail/track/mpkodpbohnmbjfbeihcbnddbbagklpni
[store-version-badge]: https://img.shields.io/chrome-web-store/v/mpkodpbohnmbjfbeihcbnddbbagklpni

[store-rating-url]: https://chrome.google.com/webstore/detail/track/mpkodpbohnmbjfbeihcbnddbbagklpni
[store-rating-badge]: https://img.shields.io/chrome-web-store/rating/mpkodpbohnmbjfbeihcbnddbbagklpni

[store-stars-url]: https://chrome.google.com/webstore/detail/track/mpkodpbohnmbjfbeihcbnddbbagklpni
[store-stars-badge]: https://img.shields.io/chrome-web-store/stars/mpkodpbohnmbjfbeihcbnddbbagklpni

[store-users-url]: https://chrome.google.com/webstore/detail/track/mpkodpbohnmbjfbeihcbnddbbagklpni
[store-users-badge]: https://img.shields.io/chrome-web-store/users/mpkodpbohnmbjfbeihcbnddbbagklpni
