import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { HashRouter } from "react-router-dom";
import { rootStore } from "./core/store";
import Main from "./scene/main";
const mainPath = "./scenes/main";
const rootElement = document.getElementById("app");
ReactDOM.render(React.createElement(AppContainer, null,
    React.createElement(HashRouter, null,
        React.createElement(Provider, { store: rootStore },
            React.createElement(Main, null)))), rootElement);
if (module.hot) {
    module.hot.accept(mainPath, () => {
        const ReloadMain = require(mainPath).default;
        ReactDOM.render(React.createElement(AppContainer, null,
            React.createElement(HashRouter, null,
                React.createElement(Provider, { store: rootStore },
                    React.createElement(ReloadMain, null)))), rootElement);
    });
}
//# sourceMappingURL=index.js.map