"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Waiting.css");
const AppStateProvider_1 = require("../../AppStateProvider");
const register_1 = require("../../common/keybindings/register");
const settingsRepository_1 = require("../../data/settingsRepository");
class Waiting extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        settingsRepository_1.getKeybindings().then(response => {
            register_1.register(response);
        });
    }
    render() {
        return (React.createElement("div", { id: "home-page-container" },
            React.createElement("a", { className: "settings", href: "#/Settings" }),
            React.createElement("div", { className: "message", style: { display: this.context.state.waiting.showMessage === true ? "" : "none" } }),
            React.createElement("span", { className: "thinking", style: { display: this.context.state.waiting.isThinking === true ? "" : "none" } }),
            React.createElement("span", { className: "marquee", style: { display: this.context.state.waiting.isWaiting === true ? "" : "none" } })));
    }
}
// React will assign context for you if we supply the type
// https://www.taniarascia.com/using-context-api-in-react/
Waiting.contextType = AppStateProvider_1.AppContext;
exports.Waiting = Waiting;
//# sourceMappingURL=Waiting.js.map