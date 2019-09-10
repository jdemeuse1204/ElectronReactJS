"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const url = require("url");
const logging = require("../logging");
const ioHook = window.require('iohook');
const { BrowserWindow, screen } = window.require('electron').remote;
let windows = [];
exports.getWindows = () => {
    return windows;
};
exports.register = (keybindings) => {
    for (let keybinding of keybindings) {
        logging.info(`Key Binding: ${keybinding.name}, Sequence: ${keybinding.sequence}`);
        switch (keybinding.type) {
            default:
            case "url":
                registerUrlKeybinding(keybinding);
                break;
        }
    }
    ioHook.start();
};
const registerUrlKeybinding = (keybinding) => {
    registerGlobalShortcut(keybinding.sequence, () => {
        logging.info(`Main Shortcut Processed - Key Binding: ${keybinding.name}, Sequence: ${keybinding.sequence}`);
        let window = getWindow(keybinding.name);
        if (!window) {
            window = new BrowserWindow({ width: 600, height: 800, webPreferences: { nodeIntegration: true } });
            window.setMenu(null);
            setWindow(keybinding.name, window);
            window.on('closed', () => {
                const index = windows.findIndex(w => w.name === keybinding.name);
                if (index != -1) {
                    windows.splice(index, 1);
                }
                window = null;
            });
        }
        registerAdSkipper(window, keybinding.data.url);
        window.loadURL(keybinding.data.url);
    }, this);
    for (let command of keybinding.commands) {
        logging.info(`Key Binding: ${keybinding.name}, Command Name: ${command.name}, Command Sequence: ${command.sequence}`);
        registerGlobalShortcut(command.sequence, () => {
            const window = getWindow(keybinding.name);
            logging.info(`Child Shortcut Processed - Key Binding: ${keybinding.name}, Sequence: ${command.sequence}, Window URL: ${window.webContents.getURL()}`);
            sendBrowserCommand(command, window);
        }, this);
    }
};
const getWindow = (name) => {
    const item = windows.find(w => w.name == name);
    return item == null ? null : item.window;
};
const setWindow = (name, window) => {
    windows.push({ name, window });
};
const sendBrowserCommand = (command, window) => {
    switch (command.type) {
        case "browsercommand":
            sendWindowCommand(command, window);
            break;
        case "closebrowser":
            closeBrowser(window);
            break;
        case "showsongtitle":
            const title = getSongTitleFromWindow(window);
            showSongPlayingMessage(title);
            break;
    }
};
const sendWindowCommand = (command, window) => {
    const actions = [
        { keyCode: command.action.payload, type: 'keyDown' },
        { keyCode: command.action.payload, type: 'char' },
        { keyCode: command.action.payload, type: 'keyUp' }
    ];
    for (let action of actions) {
        window.webContents.sendInputEvent(action);
    }
};
const closeBrowser = (window) => {
    window.close();
};
const registerAdSkipper = (window, url) => {
    if (url.includes("youtube")) {
        window.webContents.executeJavaScript("setInterval(function() { var skipButton = document.getElementsByClassName(\"ytp-ad-skip-button\"); if (skipButton && skipButton.length > 0) { skipButton[0].click(); } }, 1000)");
    }
};
const registerGlobalShortcut = (sequence, callback, scope) => {
    callback.bind(scope);
    const parsedSequence = JSON.parse(sequence);
    ioHook.registerShortcut(parsedSequence, callback);
};
const showSongPlayingMessage = (title) => {
    const display = screen.getPrimaryDisplay();
    const width = display.bounds.width;
    const finalHeight = 70;
    const finalWidth = 400;
    const window = new BrowserWindow({ width: finalWidth, height: finalHeight, frame: false, x: (width - finalWidth) - 30, y: 20, webPreferences: { nodeIntegration: true } });
    const style = `@-webkit-keyframes scroll-right { 0% { left: 0; } 100% { left: #replace#; } } @-moz-keyframes scroll-right { 0% { left: 0; } 100% { left: #replace#; }} @-o-keyframes scroll-right { 0% { left: 0; } 100% { left: #replace#; } } @keyframes scroll-right { 0% { left: 0; } 100% { left: #replace#; } }`;
    window.webContents.executeJavaScript(`document.getElementById(\"now-playing\").innerHTML = "${title}"`);
    window.webContents.executeJavaScript(`
    var width = document.getElementById("now-playing").offsetWidth;  

    if (width > 350) {
        var left = -(width - 350);
        var style = "${style}".replace(/#replace#/g, left + "px"); 
        var css = document.createElement('style'); 
        css.type = 'text/css'; 
    
        if (css.styleSheet)  
        {
            css.styleSheet.cssText = style; 
        }
        else  
        {
            css.appendChild(document.createTextNode(style));   
        }
    
        document.getElementById("styles").appendChild(css);

        setTimeout(function() { document.getElementById("now-playing").classList.add("scroll-6s"); }, 2000);
        setTimeout(function() { document.getElementById("now-playing").style.left = left + "px"; }, 5950)
    }`);
    window.setMenu(null);
    window.setAlwaysOnTop(true, 'floating');
    window.setVisibleOnAllWorkspaces(true);
    window.setFullScreenable(false);
    const loadUrl = url.format({
        pathname: path.join(__dirname, '/../../app/pages/now-playing/NowPlaying.html'),
        protocol: 'file:',
        slashes: true
    });
    window.loadURL(loadUrl);
    setTimeout(() => {
        window.close();
    }, 8000);
};
const getSongTitleFromWindow = (window) => {
    const url = window.webContents.getURL();
    if (url.includes("youtube.com")) {
        return window.webContents.getTitle().replace(" - YouTube", "").replace(/^\([0-9]*\) /, "");
    }
    return window.webContents.getTitle();
};
//# sourceMappingURL=register.js.map