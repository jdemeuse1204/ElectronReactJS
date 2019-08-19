/** 
 * This is the main entry point of your React application. 
 * The React application is a React component like any other react components. 
 */
import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/home/Home';
import Test from './pages/test/Test';
import { AppStateProvider } from './AppStateProvider';
import { Header } from './shared-components/header/Header';

export class App extends React.Component {
  render(): React.ReactNode {

    console.log(appSettings.allEnvs);

    return (
      <AppStateProvider>
        <Router>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/test" component={Test} />
            </Switch>
          </div>
        </Router>
      </AppStateProvider >
    );
  }
}