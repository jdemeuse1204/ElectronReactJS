"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is the main entry point of your React application.
 * The React application is a React component like any other react components.
 */
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Waiting_1 = require("./pages/waiting/Waiting");
const AppStateProvider_1 = require("./AppStateProvider");
class App extends React.Component {
    render() {
        return (React.createElement(AppStateProvider_1.AppStateProvider, null,
            React.createElement(react_router_dom_1.HashRouter, null,
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Waiting_1.Waiting })))));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map