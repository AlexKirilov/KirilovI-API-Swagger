import { getEmployeeList } from "../../services/EmployeeService";

export const GET_EMPLOYEES = "GET_EMPLOYEES";

const getEmployees = (employeeList) => ({
  type: GET_EMPLOYEES,
  payload: employeeList,
});

export async function loadEmployeeList(dispatch, getState) {
  const response = await getEmployeeList();
  dispatch(getEmployees(response));
}
