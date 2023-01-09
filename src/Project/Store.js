import { legacy_createStore as createStore } from 'redux';
import State from "./Reducer/rootReducer";
const Store = createStore(State);

export default Store;