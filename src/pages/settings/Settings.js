"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../common-types.d.ts" />
const React = require("react");
require("./Settings.css");
const AppStateProvider_1 = require("../../AppStateProvider");
const settingsRepository_1 = require("../../data/settingsRepository");
class Settings extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        settingsRepository_1.getKeybindings().then(data => {
            this.context.set({
                settings: {
                    keybindings: data
                }
            });
        });
    }
    render() {
        return (React.createElement("div", { id: "home-page-container" },
            React.createElement("a", { href: "#/" }, "Back"),
            React.createElement("div", null, this.context.state.settings.keybindings.map(w => React.createElement("span", null, w.name)))));
    }
}
// React will assign context for you if we supply the type
// https://www.taniarascia.com/using-context-api-in-react/
Settings.contextType = AppStateProvider_1.AppContext;
exports.Settings = Settings;
//# sourceMappingURL=Settings.js.map