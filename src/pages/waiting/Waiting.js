"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Waiting.css");
const AppStateProvider_1 = require("../../AppStateProvider");
const $ = require("jquery");
const { globalShortcut } = window.require('electron').remote;
class Waiting extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        globalShortcut.register('Control+Alt+Space', () => {
            alert($);
            // mainWindow.webContents.sendInputEvent({ keyCode: 'Space', type: 'keyDown' });
            // mainWindow.webContents.sendInputEvent({ keyCode: 'Space', type: 'char' });
            // mainWindow.webContents.sendInputEvent({ keyCode: 'Space', type: 'keyUp' });
        });
        fetch('keybinds.json').then(response => {
            return response.text();
        }).then(data => {
            // Work with JSON data here
            alert(data);
        }).catch(err => {
            // Do something for an error here
            alert(err);
        });
    }
    render() {
        return (React.createElement("div", { id: "home-page-container" },
            React.createElement("h1", null, "Home Page 1"),
            React.createElement("a", { href: "#/test" }, "Go To Test Page"),
            React.createElement("p", null,
                "State Id Value: ",
                this.context.state.Id)));
    }
}
// React will assign context for you if we supply the type
// https://www.taniarascia.com/using-context-api-in-react/
Waiting.contextType = AppStateProvider_1.AppContext;
exports.Waiting = Waiting;
//# sourceMappingURL=Waiting.js.map