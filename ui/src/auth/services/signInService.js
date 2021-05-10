import jsonwebtoken from 'jsonwebtoken';
import { setToken } from "../../services/CookieService";
import axiosInstance from "../../interceptors/interceptor";

export const readTokenData = (details) => {
  const token = details.token.replace("Bearer ", "");
  const tokenDetails = jsonwebtoken.decode(token);
  setToken(details.token, tokenDetails.exp);

  return !!token && tokenDetails.exp; // { message: 'Access granted' };
}

export const signIn = async (email, password, company) => {
  try {
    const str = JSON.stringify({ "email": email, "password": password, "company": company });
    // create a buffer
    const buff = Buffer.from(str, 'utf-8');

    // decode buffer as Base64
    const base64 = buff.toString('base64');

    // return await fetch(`/api/platform/auth/sign-in/${base64}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'siteID': '6015ac720ab3bc1ce44ee776'
    //   }
    // }).catch(err => err)
    return await axiosInstance()
      .post(`/platform/auth/sign-in/${base64}`, {})
      .then(res => res && res.data ? res.data : res)
      .catch(err => err);
  } catch (error) {
    console.log('Fetch err=> ', error)
    return error;
  }
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