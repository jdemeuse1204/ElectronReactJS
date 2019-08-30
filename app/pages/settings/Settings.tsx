/// <reference path="../../common-types.d.ts" />
import * as React from 'react';
import './Settings.css';
import { AppContext } from '../../AppStateProvider';
import { getKeybindings } from '../../data/settingsRepository';
import { BrowserWindow as WebBrowserWindow } from 'electron';

export class Settings extends React.Component {

    // React will assign context for you if we supply the type
    // https://www.taniarascia.com/using-context-api-in-react/
    static contextType = AppContext;

    // Define our context
    context!: IReactContext<IAppState>;
    pandora: WebBrowserWindow;

    constructor(props: any, context: IReactContext<IAppState>) {
        super(props);
        this.context = context;

        getKeybindings().then(data => {
            this.context.set({
                settings: {
                    keybindings: data
                }
            });
        });
    }

    render(): React.ReactNode {
        return (
            <div id="home-page-container">
                <a href="#/">Back</a>
                <div>
                    {
                        this.context.state.settings.keybindings.map(w => <span>{w.name}</span>)
                    }
                </div>
            </div>
        );
    }
}