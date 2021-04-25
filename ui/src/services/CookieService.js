import cookie from 'react-cookies';

const setCookie = (name, data, expires = null) => {
  cookie.save(name, data,
    {
      path: '/',
      expires: expires ? new Date(expires) : null,
      secure: true,
      httpOnly: false
    }
  )
}

const setExpTime = (exp) => {
  setCookie('expTime', exp)
}

export const getExpTime = () => {
  return +cookie.load('expTime', true)
}

// Returns the remaining session time in minutes
export const remainingSessionTime = () => {
  const expAt = new Date(getExpTime());
  const currentTime = new Date();
  const timeLeft = Math.abs(expAt - currentTime);
  const remainingMin = Math.floor(timeLeft / 60000);
  return remainingMin;
}

export const checkSession = () => {
  return getToken() && remainingSessionTime() > 0;
}

export const setToken = (token, exp) => {
  setCookie('token', token, exp);
  setExpTime(exp);
}

export const getToken = () => {
  return cookie.load('token', true)
}

export const logout = () => {
  cookie.remove('token');
  cookie.remove('expTime');
}