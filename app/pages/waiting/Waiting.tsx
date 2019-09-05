import * as React from 'react';
import './Waiting.css';
import { AppContext } from '../../AppStateProvider';
import { register } from '../../common/keybindings/register';
import { getKeybindings } from '../../data/settingsRepository';

export class Waiting extends React.Component {

    // React will assign context for you if we supply the type
    // https://www.taniarascia.com/using-context-api-in-react/
    static contextType = AppContext;

    // Define our context
    context!: IReactContext<IAppState>;

    constructor(props: any, context: IReactContext<IAppState>) {
        super(props);
        this.context = context;

        getKeybindings().then(response => {
            register(response);
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