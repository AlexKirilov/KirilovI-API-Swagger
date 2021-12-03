import * as type from "../Actions/employee.actions";

const initialState = {
  employeeList: null,
  loading: true,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_EMPLOYEES:
      return {
        employeeList: action.payload,
        loading: false,
      };
    case type.CREATE_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload,
        loading: false,
      };
    case type.UPDATE_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload,
        loading: false,
      };
    case type.DELETE_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
