"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lodash_1 = require("lodash");
exports.update = (state) => void (0);
class StateProvider extends React.Component {
    constructor(props, defaultContext, defaultState) {
        super(props); // need to pass the same props that constructor passes, otherwise we get an error
        this.set = (appState) => {
            // if there are nested objects on state, we need to merge those nested objects
            // otherwise they will be overwritten the way setState works
            this.setState(lodash_1.merge(this.state, appState));
        };
        this.state = defaultState;
        this.appContext = defaultContext;
    }
    render() {
        const context = this.appContext;
        return (React.createElement(context.Provider, { value: { state: this.state, set: this.set } }, this.props.children));
    }
}
exports.StateProvider = StateProvider;
//# sourceMappingURL=StateProvider.js.map