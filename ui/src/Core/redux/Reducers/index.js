import { combineReducers } from "redux";
import { employeeReducer } from "./Employee.reducer";
import { productsReducer } from "./Products.reducer";

const rootReducer = combineReducers({
    employeeReducer,
    productsReducer
}); 

export default rootReducer;