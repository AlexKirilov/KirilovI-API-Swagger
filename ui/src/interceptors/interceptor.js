import axios from "axios";
import { getToken, checkSession, logout } from "../services/CookieService";

const interceptors = (history = null) => {

  let headers = {}

  const siteID = "6015ac720ab3bc1ce44ee776";

  headers['siteID'] = siteID;
  headers['Content-Type'] = 'application/json';

  if (checkSession()) {
    headers.Authorization = `${getToken()}`;
  }

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4567/api/',
    headers
  });

  axiosInstance.interceptors.response.use(
    (response) => new Promise((resolve, reject) => {
      resolve(response)
    }),
    (error) => {
      const config = error.response.config;
      const location = config ? config.location.pathname ? config.location.pathname : config.url ? config.url : null : null;
      console.log('Interceptor ERR 2 => ', location.includes("sign-in"), error.response)
      if (!error.response) {
        return Promise.reject(error.response)
      }

      if (error.response.status === 403 && !location.includes("sign-in")) {
        logout();
        if (history) history.push('/sign-in');
        else window.location = "/sign-in";
      } else {
        return Promise.reject(error.response);
      }
    }
  );

  return axiosInstance;
}

export default interceptors();