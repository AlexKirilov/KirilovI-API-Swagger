import axiosInstance from "../interceptors/interceptor";

const path = "employees";

export async function getEmployeeList() {
  try {
    return await axiosInstance()
      .get(`/${path}`)
      .then((res) => {
        const data = res && res.data ? res.data : res;
        if (!data?.results || !data?.results?.length) {
          console.log("API EMPLOYEES DATA 1", data);
          return data;
        }
        else {
          console.log("API EMPLOYEES DATA 2", data);
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

export async function addNewEmployee(employeeDetails) {
  if (!employeeDetails)
    return { message: "Provided employees details were empty or invalid" };
  /** Example
     * {
            "password":"$2a$10$TR/yxml/jUQqvhG6bAZEMOSWfMqCOPadPlyymtqF2IU7XpmJR5C7W",
            "firstname":"I am Updated Name",
            "lastname":"Updated Last Name",
            "email":"new@new.com",
            "levelAuth":"MN",
            "type":"Manager",
            "created":"2018-05-30T23:00:00.000+00:00",
            "lastLogin":"2020-12-01T14:18:47.838+00:00",
            "active":"true",
            "siteID":"5fbd61b050682000149ce416",
            "company":"new",
            "personalDiscount":"0",
            "country":"United Kingdom",
            "town":"SURBITON",
            "postcode":"545324",
            "address":"436b Ewell Road",
            "address1":"",
            "phone":"3524624523"
        }
     */
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
  /** Example
     * {
            "password":"$2a$10$TR/yxml/jUQqvhG6bAZEMOSWfMqCOPadPlyymtqF2IU7XpmJR5C7W",
            "firstname":"I am Updated Name",
            "lastname":"Updated Last Name",
            "email":"new@new.com",
            "levelAuth":"MN",
            "type":"Manager",
            "created":"2018-05-30T23:00:00.000+00:00",
            "lastLogin":"2020-12-01T14:18:47.838+00:00",
            "active":"true",
            "siteID":"5fbd61b050682000149ce416",
            "company":"new",
            "personalDiscount":"0",
            "country":"United Kingdom",
            "town":"SURBITON",
            "postcode":"545324",
            "address":"436b Ewell Road",
            "address1":"",
            "phone":"3524624523"
        }
     */
  try {
    return await axiosInstance()
      .patch(`/employees/${employeeDetails?.id}`, employeeDetails)
      .then((res) => (res && res.data ? res.data : res))
      .catch((err) => err);
  } catch (err) {
    return err;
  }
}

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
  // Need to ensure what data is returned and ensure all options will work
  if (employeeList && employeeList?.length) {
    employeeList.forEach((emp) => {
      delEmployeeById(emp?.id || emp);
    });
  } else return { message: "Provided list of employees was empty" };
}
