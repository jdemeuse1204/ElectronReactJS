import { sendKeyInputEvent } from '../../common/electron/utilities';
const { globalShortcut, BrowserWindow } = (window as any).require('electron').remote;

export const register = () => {
    globalShortcut.register('Control+Alt+Space', () => {

        sendKeyInputEvent('Space', this.pandora.webContents);

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
}