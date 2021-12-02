import { combineReducers } from "redux";
import { employeeReducer } from "./Employee.reducer";

const rootReducer = combineReducers({
    employeeReducer
}); 

export default rootReducer;