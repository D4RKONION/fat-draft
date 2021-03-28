import { createStore } from 'redux';

import rootReducer from '../reducers';

import { composeWithDevTools } from "redux-devtools-extension";
import { actionCreators } from "../actions";

const composeEnhancers = composeWithDevTools({
    actionCreators,
    trace: true,
    traceLimit: 25,
  })

const store = createStore(rootReducer, composeEnhancers());

export default store;