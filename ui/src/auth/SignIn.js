import React from "react";
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import { EmailInput } from "./components/EmailInput";
import { PassInput } from "./components/PassInput";
import { signIn, readTokenData } from "./services/signInService";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const SignIn = () => {
  let history = useHistory();

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
      else if (res.message) { // TODO: it requires a better way
        setValues({ ...userDetails, errorMsg: res.message });
      } else if (readTokenData(res)) {
        setValues({ ...userDetails, errorMsg: "" });
        history.push("/dashboard");
        window.location.reload(); // TODO: Need better way
      }

    }).catch(err => {
      // TODO: Log the error
      console.log('LOGIN ERR => ', err);
    });
  }

  return (
    <section className="full-page">
      <form className="in-middle" autoComplete="off" >

        <EmailInput
          value={userDetails.password}
          onChange={handleEmailChange}
          required={true}
        ></EmailInput>

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

        <label
          className="error-msg"
        >{userDetails.errorMsg}</label>

        <Button variant="contained" color="primary" disableElevation onClick={btnClick} className="submit-btn">
          Sign In
        </Button>

      </form>
    </section>
  );
};
