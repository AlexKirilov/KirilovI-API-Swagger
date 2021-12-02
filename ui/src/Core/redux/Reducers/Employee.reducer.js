import * as type from "../Actions/employee.actions";

const initialState = {
  employeeList: null,
  loading: true,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_EMPLOYEES:
      console.log("STATE 1 ==> ", {
        ...state,
        employeeList: action.payload,
        loading: false,
      });
      return {
        ...state,
        employeeList: action.payload,
        loading: false,
      };

    default:
      console.log("STATE DEFAULT ==> ", action.type);
      return state;
  }
};
