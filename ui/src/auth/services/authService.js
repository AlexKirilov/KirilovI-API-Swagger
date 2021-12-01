import jsonwebtoken from 'jsonwebtoken';
import { setToken } from "../../Core/services/CookieService";
import axiosInstance from "../../Core/interceptors/interceptor";

export const readTokenData = (details) => {
  debugger
  const token = details.token.replace("Bearer ", "");
  const tokenDetails = jsonwebtoken.decode(token);
  setToken(details.token, tokenDetails.exp);

  return !!token && tokenDetails.exp;
}

export const signIn = async (email, password, company) => {
  try {
    const str = JSON.stringify({ "email": email, "password": password, "company": company });
    // create a buffer
    const buff = Buffer.from(str, 'utf-8');

    // decode buffer as Base64
    const base64 = buff.toString('base64');

    return await axiosInstance()
      .post(`/platform/auth/sign-in/${base64}`, {})
      .then(res => res && res.data ? res.data : res)
      .catch(err => err);
  } catch (error) {
    return error;
  }
}

export const signUp = async (newAccDetails) => {
  return await axiosInstance()
    .post(`/platform/auth/sign-up/`, newAccDetails)
    .then(res => res && res.data ? res.data : res)
    .catch(err => err);
}

export const checkForExistingEmail = async (email) => {
  return await axiosInstance()
    .get(`/verify/email/${email}`)
    .then(res => res && res.data ? res.data : res)
    .catch(err => err);
}

export const checkForExistingWebSiteName = async (name) => {
  return await axiosInstance()
    .get(`/verify/websiteName/${name}`)
    .then(res => res && res.data ? res.data : res)
    .catch(err => err);
}

export const verifyToken = async (token) => {
  return await axiosInstance()
    .get(`/verify/token/${token}`)
    .then(res => res && res.data ? res.data : res)
    .catch(err => err);
}

export const getSiteTypes = async () => {
  return axiosInstance()
    .get('platform/siteTypes/')
    .then(res => res && res.data ? res.data : res)
    .catch(err => err);
}
// export async function getAllLogs() {

//   try {
//     const response = await fetch('/api/logs');
//     return await response.json();
//   } catch (error) {
//     return [];
//   }

// }

// export async function createLog(data) {
//   const response = await fetch(`/api/logs`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ user: data })
//   })
//   return await response.json();
// }