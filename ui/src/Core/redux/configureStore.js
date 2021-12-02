import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'

export const storeKey = 'platform_key';

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(storeKey, serializedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStorage and convert into an Object
// invalid output must be undefined
export function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem(storeKey);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

// export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, loadFromLocalStorage(), composeWithDevTools(
    applyMiddleware(thunkMiddleware),
));

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));
