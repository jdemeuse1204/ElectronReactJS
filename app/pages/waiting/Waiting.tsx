import * as React from 'react';
import './Waiting.css';
import { AppContext } from '../../AppStateProvider';
import * as $ from 'jquery';
const { globalShortcut } = (window as any).require('electron').remote;

export class Waiting extends React.Component {

    // React will assign context for you if we supply the type
    // https://www.taniarascia.com/using-context-api-in-react/
    static contextType = AppContext;

    // Define our context
    context!: IReactContext<IAppState>;

    constructor(props: any, context: IReactContext<IAppState>) {
        super(props);
        this.context = context;

        globalShortcut.register('Control+Alt+Space', () => {
            alert($);
            // mainWindow.webContents.sendInputEvent({ keyCode: 'Space', type: 'keyDown' });
            // mainWindow.webContents.sendInputEvent({ keyCode: 'Space', type: 'char' });
            // mainWindow.webContents.sendInputEvent({ keyCode: 'Space', type: 'keyUp' });
        });
    }

    render(): React.ReactNode {
        return (
            <div id="home-page-container">
                <h1>Home Page 1</h1>
                <a href="#/test">Go To Test Page</a>
                <p>State Id Value: {this.context.state.Id}</p>
            </div>
        );
    }
}