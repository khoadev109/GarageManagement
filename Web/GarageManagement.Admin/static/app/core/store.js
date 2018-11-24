import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../core/reducer";
export const rootStore = createStore(rootReducer, applyMiddleware(thunk));
//# sourceMappingURL=store.js.map