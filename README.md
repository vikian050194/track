# track

[![MIT license][license-badge]][license-url]
[![Maintenance status][status-badge]][status-url]

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
| Host | Basic part of URL |
| Team | Your team space |

As a result `<Host>/<Team>-<issue number>` will be opended. Please do not forget to add `http` or `https` in the beginning.

## Tests

So faw there are no tests

[warp-url]: https://github.com/vikian050194/warp

[status-url]: https://github.com/vikian050194/track/pulse
[status-badge]: https://img.shields.io/github/last-commit/vikian050194/track.svg

[license-url]: https://github.com/vikian050194/track/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/vikian050194/track.svg
