"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../../common/electron/utilities");
const { globalShortcut, BrowserWindow } = window.require('electron').remote;
exports.register = () => {
    globalShortcut.register('Control+Alt+Space', () => {
        utilities_1.sendKeyInputEvent('Space', this.pandora.webContents);
    });
    globalShortcut.register('Control+Alt+P', () => {
        if (!this.pandora) {
            this.pandora = new BrowserWindow({ width: 600, height: 800, webPreferences: { nodeIntegration: true } });
            this.pandora.on('closed', () => {
                this.pandora = null;
            });
        }
        this.pandora.loadURL("https://www.youtube.com/");
    });
};
//# sourceMappingURL=keybinds.js.map