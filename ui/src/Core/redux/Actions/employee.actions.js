import {
  getEmployeeList,
  delEmployeeList,
  addNewEmployee,
  patchEmployeeById,
} from "../../services/EmployeeService";

export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

const getEmployees = (employeeList) => ({
  type: GET_EMPLOYEES,
  payload: employeeList,
});

function newUserDetails(userDetails) {
  // TODO: API must be update to accept correct format or both
  const newUser = JSON.parse(JSON.stringify({ ...userDetails }));
  delete newUser.address;
  // TODO: Remove me later
  newUser.password = "temp";
  // levelAuth - need to be ???? removed update or what
  newUser.town = userDetails?.address?.town || null;
  newUser.phone = userDetails?.address?.phone || null;
  newUser.address = userDetails?.address?.address || null;
  newUser.country = userDetails?.address?.country || null;
  newUser.postcode = userDetails?.address?.postcode || null;
  newUser.address1 = userDetails?.address?.address1 || null;
  newUser.address2 = userDetails?.address?.address2 || null;
  return newUser;
}

export async function loadEmployeeListAction(dispatch, getState) {
  console.log("===== getState ===== ", getState);
  const response = await getEmployeeList();
  dispatch(getEmployees(response));
}

export async function createEmployeeAction(dispatch, employeeDetails) {
  return new Promise(async (resolve, reject) => {
    if (!employeeDetails)
      return reject({ message: "There was an issue with provided details" });
    // TODO: Need better way of updating the store directly
    // TODO: On Error Promise returns into the Resolve not into the Reject - Fix that or understand how exactly ot`s working
    addNewEmployee(newUserDetails(employeeDetails)).then(async (res) => {
      if (res && ((!res.status && res.message) || res.status === 200)) {
        const newEEList = await getEmployeeList();
        dispatch(getEmployees(newEEList));
        resolve(res);
      } else {
        reject(res?.data);
      }
    });
  });
}

export async function patchExistingEmployeeByIdAction(
  dispatch,
  employeeDetails
) {
  return new Promise(async (resolve, reject) => {
    if (!employeeDetails)
      return reject({ message: "There was an issue with provided details" });
    // TODO: Need better way of updating the store directly
    // TODO: On Error Promise returns into the Resolve not into the Reject - Fix that or understand how exactly ot`s working
    patchEmployeeById(newUserDetails(employeeDetails)).then(async (res) => {
      if (res && ((!res.status && res.message) || res.status === 200)) {
        const newEEList = await getEmployeeList();
        dispatch(getEmployees(newEEList));
        resolve(res);
      } else {
        reject(res?.data);
      }
    });
  });
}

export async function deleteEmployeeListAction(dispatch, eeListIds) {
  return new Promise(async (resolve, reject) => {
    if (!eeListIds && !eeListIds?.length) return reject(null);
    // TODO: Need better way of updating the store directly
    // TODO: On Error Promise returns into the Resolve not into the Reject - Fix that or understand how exactly ot`s working
    delEmployeeList(eeListIds).then(async (res) => {
      if (res && ((!res.status && res.message) || res.status === 200)) {
        const newEEList = await getEmployeeList();
        dispatch(getEmployees(newEEList));
        resolve(res);
      } else {
        reject(res?.data);
      }
    });
  });
}
