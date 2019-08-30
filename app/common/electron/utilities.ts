import { WebContents, BrowserWindow as WebBrowserWindow } from 'electron';
const { BrowserWindow } = (window as any).require('electron').remote;

export const keyInputEventBuilder = (key: string): any[] => {
    return [
        { keyCode: key, type: 'keyDown' },
        { keyCode: key, type: 'char' },
        { keyCode: key, type: 'keyUp' }
    ];
}

export const sendKeyInputEvent = (key: string, webContents: WebContents) => {

    const events = keyInputEventBuilder(key);

    for (let e of events) {
        webContents.sendInputEvent(e);
    }
}

export const createBrowserWindow = (options: any = { width: 600, height: 800, webPreferences: { nodeIntegration: true } }): WebBrowserWindow => {
    let window = new BrowserWindow(options);

    return window;
}