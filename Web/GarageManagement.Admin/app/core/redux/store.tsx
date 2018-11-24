import thunk from "redux-thunk";
import rootReducer from "./root-reducer";
import { createLogger } from "redux-logger";
import { createStore, compose, applyMiddleware } from "redux";

const middleWare = [];
const logger = createLogger();

middleWare.push(logger);
middleWare.push(thunk);

export const rootStore = createStore(
    rootReducer, 
    compose(applyMiddleware(...middleWare))
);
