import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { HashRouter } from "react-router-dom";

import { rootStore } from "core/redux/store";

import Main from "./scene/main";

const mainPath = "./scenes/main";
const rootElement = document.getElementById("wrapper");

ReactDOM.render(
    <AppContainer>
        <HashRouter>
            <Provider store={rootStore}>
                <Main />
            </Provider>            
        </HashRouter>
    </AppContainer>
    , rootElement);

declare var module: { hot: any };

if (module.hot) {
  module.hot.accept(mainPath, () => {
    const ReloadMain = require(mainPath).default;    
    ReactDOM.render(
    <AppContainer>
        <HashRouter>
            <Provider store={rootStore}>
                <ReloadMain />
            </Provider>
        </HashRouter>
    </AppContainer>
    , rootElement);
  })
}