import {
    System
} from "./handlers/index.js";

chrome.runtime.onInstalled.addListener(System.onInstall);
