"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StateProvider_1 = require("./common/context/StateProvider");
const defaultContext = {
    state: {
        Id: "Id",
        Name: ""
    },
    set: StateProvider_1.update
};
exports.AppContext = React.createContext(defaultContext);
class AppStateProvider extends StateProvider_1.StateProvider {
    constructor(props) {
        super(props, exports.AppContext, defaultContext.state);
    }
}
exports.AppStateProvider = AppStateProvider;
//# sourceMappingURL=AppStateProvider.js.map