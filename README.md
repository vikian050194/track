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

It's my second Chrome extension. And it would not be nice to mix responsibilities and add such functionality into [warp][warp-url].

## Requirements

Developed and tested on `Version 100.0.4896.75 (Official Build) (64-bit)` and newer.

## Installation

**From sources**

1. Clone repo
2. Open Chrome and navigate [here](chrome://extensions/)
3. Enable `Developer mode` via toggle
4. `Load unpacked` and select `src` directory of the cloned repo
5. Reboot Chrome - probably is not required step

## Usage

1. Activate extension
2. Type issue number
3. Press `Enter` to override current tab or `Shift+Enter` to open new tab

### Configuration

Extension has few options.

You can [setup your own shortcut for activation](chrome://extensions/shortcuts), but default one is `Alt+T` or `Command+T`.

| Name | Description |
| :--- | :--- |
| Host | Host of task tracker |
| Team | Team name value |
| Tracker | Predefined task trackers |

Please do not forget to add `http` or `https` to the `Host`.

## Tests

`mocha` and `assert` are used for testing and `c8` for coverage

`npm test` - run tests

`npm run cover` - run code coverage

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
