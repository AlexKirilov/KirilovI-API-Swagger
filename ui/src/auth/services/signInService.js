import jsonwebtoken from 'jsonwebtoken';
import { setToken } from "../../services/CookieService";

const siteID = "6015ac720ab3bc1ce44ee776";

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

    // {"email":"alexkkirilov@gmail.com", "password": "password", "company": "testing"  }
    return await fetch(`/api/platform/auth/sign-in/${base64}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'siteID': siteID }
    }).then(res => res.json())
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