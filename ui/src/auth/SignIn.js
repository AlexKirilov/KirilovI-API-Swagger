import React from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import { EmailInput } from "./components/EmailInput";
import { PassInput } from "./components/PassInput";
import { signIn, readTokenData } from "./services/authService";

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SignIn = () => {
  let history = useHistory();
  const [invalid, setInvalid] = React.useState({
    format: null,
    notMatched: null
  });
  const [userDetails, setValues] = React.useState({
    email: "",
    company: "",
    password: "",
    errorMsg: " "
  });

  const handleEmailChange = (event) => {
    setValues({ ...userDetails, email: event.target.value });
  };

  const handlePassChange = (event) => {
    setValues({ ...userDetails, password: event.target.value });
  };

  const handleCompanyChange = (event) => {
    setValues({ ...userDetails, company: event.target.value });
  };

  const btnClick = () => {
    signIn(userDetails.email, userDetails.password, userDetails.company).then(res => {
      if (!res) return
      else if (res.status !== 200 && res.data && Object.keys(res.data)) { // TODO: it requires a better way
        setValues({ ...userDetails, errorMsg: res.data.message });
      } else if (res.token && readTokenData(res)) {
        setValues({ ...userDetails, errorMsg: "" });
        history.push("/dashboard");
        window.location.reload(); // TODO: Need better way
      }

    }).catch(err => {
      // TODO: Log the error
      console.log('LOGIN ERR => ', err);
    });
  }

  const checkEmailHandler = (e) => {
    const email = e.target.value;
    if (email.length > 8) {
      if (!regex.test(email)) setInvalid({ ...invalid, format: 'Invalid email format' })
      else setInvalid({ ...invalid, format: null });
    } else setInvalid({ ...invalid, format: null });
    handleEmailChange(e);
  };

  return (
    <section className="full-page">
      <form className="in-middle" autoComplete="off" >

        <EmailInput name="email" email={userDetails.email} onChange={checkEmailHandler} invalid={invalid.format} required={true}></EmailInput>

        <PassInput
          value={userDetails.password}
          onChange={handlePassChange}
          required={true}
        ></PassInput>

        <FormControl className="company-input">
          <InputLabel htmlFor="standard-adornment-company">Company</InputLabel>
          <Input
            id="standard-adornment-company"
            type="text"
            value={userDetails.company}
            onChange={handleCompanyChange}
          />
        </FormControl>

        <div className="error-msg">{userDetails.errorMsg}</div>

        <Button variant="contained" color="primary" disableElevation onClick={btnClick} className="submit-btn">
          Sign In
        </Button>

        <div className="nav-btns-login">
          <Link to={"/restore-pass"} className="reset-btn">
            Forgot password
          </Link>

          <Link to={"/sign-up"} className="sign-up-link-btn">
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
};
