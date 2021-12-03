import axiosInstance from "../interceptors/interceptor";

const path = "employees";
export async function checkIfEmployeeEmailExists() {}

export async function getEmployeeList() {
  try {
    return await axiosInstance()
      .get(`/${path}`)
      .then((res) => {
        const data = res && res.data ? res.data : res;
        if (!data?.results || !data?.results?.length) {
          return data;
        } else {
          data.results = data.results.map((ee) => {
            ee.id = ee._id;
            delete ee._id;
            if (!ee.username && (ee.firstname || ee.lastname))
              ee.username =
                (ee.firstname ? ee.firstname + " " : "") + ee.lastname;
            return ee;
          });
          return data;
        }
      })
      .catch((err) => err);
  } catch (err) {
    return err;
  }
}

export async function getEmployeeById(employeeId) {
  if (!employeeId)
    return { message: "Provided employee id was empty or undefined" };

  try {
    return await axiosInstance()
      .get(`/${path}/${employeeId}`)
      .then((res) => (res && res.data ? res.data : res))
      .catch((err) => err);
  } catch (err) {
    return err;
  }
}

// TODO: API - option to create temp accounts / create temp passwords which users could update by following the email link
export async function addNewEmployee(employeeDetails) {
  if (!employeeDetails)
    return { message: "Provided employees details were empty or invalid" };
  try {
    return await axiosInstance()
      .post(`/${path}`, employeeDetails)
      .then((res) => (res && res.data ? res.data : res))
      .catch((err) => err);
  } catch (err) {
    return err;
  }
}

export async function patchEmployeeById(employeeDetails) {
  if (!employeeDetails)
    return { message: "Provided employees details were empty or invalid" };
  try {
    return await axiosInstance()
      .patch(`/employees/${employeeDetails?.id}`, employeeDetails)
      .then((res) => (res && res.data ? res.data : res))
      .catch((err) => err);
  } catch (err) {
    return err;
  }
}

// TODO: consider if I need an option to store the deleted accounts as backup somewhere and for what period
// Do I want it just for one or when a group of users are deleted - it could be backed up just for a day - Example page Bin/Recycle
export async function delEmployeeById(employeeId) {
  if (!employeeId)
    return { message: "Provided employee id was empty or undefined" };
  try {
    return await axiosInstance()
      .delete(`/${path}/${employeeId}`)
      .then((res) => (res && res.data ? res.data : res))
      .catch((err) => err);
  } catch (err) {
    return err;
  }
}

export async function delEmployeeList(employeeList) {
  return new Promise(async (resolve, reject) => {
    // Need to ensure what data is returned and ensure all options will work
    // TODO: Ensure if even one item fails on the deletion to be displayed the error message
    // if they were not delete before -> ensure UI is refreshed correctly
    if (employeeList && employeeList?.length) {
      employeeList.forEach(async (emp) => {
        await delEmployeeById(emp?.id || emp);
      });
      resolve({ message: "All employees were deleted successfully" });
    } else reject({ message: "Provided list of employees was empty" });
  });
}
