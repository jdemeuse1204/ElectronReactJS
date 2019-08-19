import * as React from 'react';
import { HomePageSubComponent } from './sub-components/HomePageSubComponent';
import './Home.scss';
import { AppContext } from '../../AppStateProvider';

export class Home extends React.Component {

    // React will assign context for you if we supply the type
    // https://www.taniarascia.com/using-context-api-in-react/
    static contextType = AppContext;

    // Define our context
    context!: IReactContext<IAppState>;

    constructor(props:any, context:IReactContext<IAppState>) {
        super(props);
        this.context = context;
    }

    render(): React.ReactNode {
        return (
            <div id="home-page-container">
                <h1>Home Page</h1>
                <a href="#/test">Go To Test Page</a>
                <p>State Id Value: {this.context.state.Id}</p>

                <h3>Home Page Sub Component:</h3>
                <HomePageSubComponent />
            </div>
        );
    }
}