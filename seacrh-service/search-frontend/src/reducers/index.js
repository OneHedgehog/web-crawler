import { combineReducers } from "redux";
import searchReducer from './search.reducer'
import toastReducer from "./toast.reducer";

export default combineReducers({
    search: searchReducer,
    toast: toastReducer,
});