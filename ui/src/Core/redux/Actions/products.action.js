import {
    getProductsList
  } from "../../services/ProductService";
  
  export const GET_PRODUCTS = "GET_PRODUCTS";
  export const CREATE_PRODUCT = "CREATE_PRODUCT";
  export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
  export const DELETE_PRODUCT = "DELETE_PRODUCT";
  
  const getAllProducts = (employeeList) => ({
    type: GET_PRODUCTS,
    payload: employeeList,
  });
  
  
  export async function loadAllProductsListAction(dispatch, getState) {
    const response = await getProductsList();
    dispatch(getAllProducts(response));
  }
  
//   export async function createEmployeeAction(dispatch, employeeDetails) {
//     return new Promise(async (resolve, reject) => {
//       if (!employeeDetails)
//         return reject({ message: "There was an issue with provided details" });
//       // TODO: Need better way of updating the store directly
//       // TODO: On Error Promise returns into the Resolve not into the Reject - Fix that or understand how exactly ot`s working
//       addNewEmployee(newUserDetails(employeeDetails)).then(async (res) => {
//         if (res && ((!res.status && res.message) || res.status === 200)) {
//           const newEEList = await getEmployeeList();
//           dispatch(getEmployees(newEEList));
//           resolve(res);
//         } else {
//           reject(res?.data);
//         }
//       });
//     });
//   }
  
//   export async function patchExistingEmployeeByIdAction(
//     dispatch,
//     employeeDetails
//   ) {
//     return new Promise(async (resolve, reject) => {
//       if (!employeeDetails)
//         return reject({ message: "There was an issue with provided details" });
//       // TODO: Need better way of updating the store directly
//       // TODO: On Error Promise returns into the Resolve not into the Reject - Fix that or understand how exactly ot`s working
//       patchEmployeeById(newUserDetails(employeeDetails)).then(async (res) => {
//         if (res && ((!res.status && res.message) || res.status === 200)) {
//           const newEEList = await getEmployeeList();
//           dispatch(getEmployees(newEEList));
//           resolve(res);
//         } else {
//           reject(res?.data);
//         }
//       });
//     });
//   }
  
//   export async function deleteEmployeeListAction(dispatch, eeListIds) {
//     return new Promise(async (resolve, reject) => {
//       if (!eeListIds && !eeListIds?.length) return reject(null);
//       // TODO: Need better way of updating the store directly
//       // TODO: On Error Promise returns into the Resolve not into the Reject - Fix that or understand how exactly ot`s working
//       delEmployeeList(eeListIds).then(async (res) => {
//         if (res && ((!res.status && res.message) || res.status === 200)) {
//           const newEEList = await getEmployeeList();
//           dispatch(getEmployees(newEEList));
//           resolve(res);
//         } else {
//           reject(res?.data);
//         }
//       });
//     });
//   }
  