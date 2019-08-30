import * as React from 'react';
import './Waiting.css';
import { AppContext } from '../../AppStateProvider';
import { BrowserWindow as WebBrowserWindow } from 'electron';
const { globalShortcut, BrowserWindow } = (window as any).require('electron').remote;
import * as $ from 'jquery';


export class Waiting extends React.Component {

    // React will assign context for you if we supply the type
    // https://www.taniarascia.com/using-context-api-in-react/
    static contextType = AppContext;

    // Define our context
    context!: IReactContext<IAppState>;
    pandora: WebBrowserWindow;

    constructor(props: any, context: IReactContext<IAppState>) {
        super(props);
        this.context = context;

        globalShortcut.register('Control+Alt+Space', () => {

    
        });
    
        globalShortcut.register('Control+Alt+P', () => {
            debugger;
    
            if (!this.pandora) {
                this.pandora = new BrowserWindow({ width: 600, height: 800, webPreferences: { nodeIntegration: true } });
    
                this.pandora.on('closed', () => {
                    this.pandora = null;
                });
            
            }
            this.pandora.loadURL("https://www.pandora.com/");
        });
    }

    render(): React.ReactNode {
        return (
            <div id="home-page-container">
                <a className="settings" href="#/Settings"></a>
                <div className="message" style={{ display: this.context.state.waiting.showMessage === true ? "" : "none" }}></div>
                <span className="thinking" style={{ display: this.context.state.waiting.isThinking === true ? "" : "none" }}></span>
                <span className="marquee" style={{ display: this.context.state.waiting.isWaiting === true ? "" : "none" }}></span>
            </div>
        );
    }
}