import React from "react";

import { Link } from "react-router-dom";
import { EmailInput } from "./components/EmailInput";
import { signIn, readTokenData } from "./services/signInService";

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const PassRestore = () => {
  const [userDetails, setValues] = React.useState({
    email: "",
    company: "",
    errorMsg: " "
  });

  const handleEmailChange = (event) => {
    setValues({ ...userDetails, email: event.target.value });
  };

  const handleCompanyChange = (event) => {
    setValues({ ...userDetails, company: event.target.value });
  };

  const btnClick = () => {
    // signIn(userDetails.email, userDetails.company)
    //   .then(res => {
    //     if (!res) return
    //     else if (res.message) { // TODO: it requires a better way
    //       setValues({ ...userDetails, errorMsg: res.message });
    //     } else if (readTokenData(res)) {
    //       setValues({ ...userDetails, errorMsg: "" });
    //       history.push("/dashboard");
    //       window.location.reload(); // TODO: Need better way
    //     }

    //   }).catch(err => {
    //     // TODO: Log the error
    //     console.log('LOGIN ERR => ', err);
    //   });
  }

  return (
    <section className="full-page">
      <form className="in-middle" autoComplete="off" >

        <EmailInput
          value={userDetails.password}
          onChange={handleEmailChange}
          required={true}
        ></EmailInput>

        <FormControl className="company-input">
          <InputLabel htmlFor="standard-adornment-company">Company</InputLabel>
          <Input
            id="standard-adornment-company"
            type="text"
            value={userDetails.company}
            onChange={handleCompanyChange}
          />
        </FormControl>

        <label
          className="error-msg"
        >{userDetails.errorMsg}</label>

        <Button variant="contained" color="primary" disableElevation onClick={btnClick} className="submit-btn">
          Send
          </Button>

        <div className="nav-btns-login">
          <Link to={"/sign-in"} className="reset-btn">
            Back to Login
            </Link>

          <Link to={"/sign-up"} className="sign-up-link-btn">
            Sign Up
            </Link>
        </div>
      </form>
    </section>
  )
}