/** 
 * This is the main entry point of your React application. 
 * The React application is a React component like any other react components. 
 */
import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Waiting } from './pages/waiting/Waiting';
import { Settings } from './pages/settings/Settings';
import { AppStateProvider } from './AppStateProvider';


export class App extends React.Component {

    render(): React.ReactNode {

        return (
            <AppStateProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Waiting} />
                        <Route exact path="/Settings" component={Settings} />
                    </Switch>
                </Router>
            </AppStateProvider >
        );
    }
}