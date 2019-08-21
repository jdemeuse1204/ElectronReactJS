/// <reference path="../../common-types.d.ts" />
import * as React from 'react';
import './Settings.css';
import { AppContext } from '../../AppStateProvider';
const { globalShortcut } = (window as any).require('electron').remote;

export class Settings extends React.Component {

    // React will assign context for you if we supply the type
    // https://www.taniarascia.com/using-context-api-in-react/
    static contextType = AppContext;

    // Define our context
    context!: IReactContext<IAppState>;

    constructor(props:any, context:IReactContext<IAppState>) {
        super(props);
        this.context = context;

        fetch('keybinds.json').then(response => {
            return response.text();
        }).then(data => {
            // Work with JSON data here
            alert(data)
        }).catch(err => {
            // Do something for an error here
            alert(err);
        })
    }

    render(): React.ReactNode {
        return (
            <div id="home-page-container">
                <h1>Home Page</h1>
                <a href="#/test">Go To Test Page</a>
                <p>State Id Value: {this.context.state.Id}</p>
            </div>
        );
    }
}