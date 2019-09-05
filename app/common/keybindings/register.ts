/// <reference path="../../common-types.d.ts" />
import { BrowserWindow as WebBrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
const { globalShortcut, BrowserWindow, screen } = (window as any).require('electron').remote;

let windows: { window: WebBrowserWindow, name: string }[] = []

export const getWindows = (): { window: WebBrowserWindow, name: string }[] => {
    return windows;
}
export const register = (keybindings: IKeyBinding[]) => {

    registerGlobalShortcut("Control+O", showSongPlayingMessage, this);

    for (let keybinding of keybindings) {
        switch (keybinding.type) {

            default:
            case "url":
                registerUrlKeybinding(keybinding as IKeyBindUrlLoader);
                break;

        }
    }

}

const registerUrlKeybinding = (keybinding: IKeyBindUrlLoader) => {


    registerGlobalShortcut(keybinding.sequence, () => {

        let window = getWindow(keybinding.name);
        if (!window) {
            window = new BrowserWindow({ width: 600, height: 800, webPreferences: { nodeIntegration: true } });
            window.setMenu(null);

            setWindow(keybinding.name, window);

            window.on('closed', () => {
                window = null;
            });

        }

        registerAdSkipper(window, keybinding.data.url);

        window.loadURL(keybinding.data.url);
    }, this);

    for (let command of keybinding.commands) {

        registerGlobalShortcut(command.sequence, () => {
            const window = getWindow(keybinding.name);

            sendBrowserCommand(command, window);
        }, this);
    }
}

const getWindow = (name: string): WebBrowserWindow => {
    return windows[name];
}

const setWindow = (name: string, window: WebBrowserWindow): void => {
    windows[name] = window;
}

const sendBrowserCommand = (command: IBrowserCommand, window: WebBrowserWindow) => {

    switch (command.type) {
        case "browsercommand":
            sendWindowCommand(command, window);
            break;
        case "closebrowser":
            closeBrowser(window);
            break;
    }
}

const sendWindowCommand = (command: IBrowserCommand, window: WebBrowserWindow) => {
    const actions: any[] = [
        { keyCode: command.action.payload, type: 'keyDown' },
        { keyCode: command.action.payload, type: 'char' },
        { keyCode: command.action.payload, type: 'keyUp' }
    ];

    for (let action of actions) {
        window.webContents.sendInputEvent(action);
    }
}

const closeBrowser = (window: WebBrowserWindow) => {
    window.close();
}

const registerAdSkipper = (window: WebBrowserWindow, url: string) => {
    if (url.includes("youtube")) {
        window.webContents.executeJavaScript("setInterval(function() { var skipButton = document.getElementsByClassName(\"ytp-ad-skip-button\"); if (skipButton && skipButton.length > 0) { skipButton[0].click(); } }, 1000)");
    }
}

const registerGlobalShortcut = (sequence: string, callback: Function, scope: any) => {

    if (globalShortcut.isRegistered(sequence)) {
        globalShortcut.unregister(sequence)
    }

    callback.bind(scope);

    globalShortcut.register(sequence, callback);
}

const showSongPlayingMessage = () => {
    const display = screen.getPrimaryDisplay();
    const width = display.bounds.width;
    const finalHeight = 60;
    const finalWidth = 400;
    const window:WebBrowserWindow = new BrowserWindow({ width: finalWidth, height: finalHeight, x: (width - finalWidth) - 30, y: 20, frame:false, webPreferences: { nodeIntegration: true } });

    const style = `@-webkit-keyframes scroll-right { 0% { left: 0; } 100% { left: #replace#; } } @-moz-keyframes scroll-right { 0% { left: 0; } 100% { left: #replace#; }} @-o-keyframes scroll-right { 0% { left: 0; } 100% { left: #replace#; } } @keyframes scroll-right { 0% { left: 0; } 100% { left: #replace#; } }`;

    window.webContents.executeJavaScript("document.getElementById(\"now-playing\").innerHTML = \"I See Stars And Stuff - Things of the North and South and East and West and Others!\"");
    window.webContents.executeJavaScript(`
    var width = document.getElementById("now-playing").offsetWidth;  

    if (width > 350) {
        var style = "${style}".replace(/#replace#/g, "-" + (width - 350) + "px"); 
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

        setTimeout(function() { document.getElementById("now-playing").classList.add("scroll-6s"); }, 2000)
        setInterval(function() { document.getElementById("now-playing").classList.remove("scroll-6s"); }, 11000);
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
    }, 13000);
}