import { combineReducers } from "redux";

import authReducer from "./authReducer";
import appDataReducer from "./appDataReducer";
import categoriesReducer from "./categoriesReducer";

const reducersContainer = {
    authState: authReducer,
    appDataState: appDataReducer,
    categoriesState: categoriesReducer,

}

const reducers = combineReducers(reducersContainer)



export default reducers