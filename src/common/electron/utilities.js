"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { BrowserWindow } = window.require('electron').remote;
exports.keyInputEventBuilder = (key) => {
    return [
        { keyCode: key, type: 'keyDown' },
        { keyCode: key, type: 'char' },
        { keyCode: key, type: 'keyUp' }
    ];
};
exports.sendKeyInputEvent = (key, webContents) => {
    const events = exports.keyInputEventBuilder(key);
    for (let e of events) {
        webContents.sendInputEvent(e);
    }
};
exports.createBrowserWindow = (options = { width: 600, height: 800, webPreferences: { nodeIntegration: true } }) => {
    let window = new BrowserWindow(options);
    return window;
};
//# sourceMappingURL=utilities.js.map