import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import dataReducer from "./reducers/dataReducer";
import matchReducer from "./reducers/matchReducer";
import notificationReducer from "./reducers/notificationReducer";
import authReducer from "./reducers/authReducer";
import configReducer from "./reducers/configReducer";
import windowReducer from "./reducers/windowReducer";

const allReducer = combineReducers({
    data: dataReducer,
    match: matchReducer,
    notification: notificationReducer,
    auth: authReducer,
    config: configReducer,
    window: windowReducer
});

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const middleware = applyMiddleware(thunk);
const store = createStore(allReducer, composeEnhancers(middleware))

export default store;
