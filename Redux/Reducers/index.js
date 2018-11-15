import { combineReducers, createStore } from 'redux';

import SlotsReducer from './SlotsReducer'

const AppReducers = combineReducers({
    SlotsReducer,
});

const rootReducer = (state, action) => {
	return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;