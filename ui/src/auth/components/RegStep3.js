import React from 'react';
import { PassInput } from "./PassInput";

export const RegistrationStep3 = (props) => {
  const [confirmPass, setValues] = React.useState();

  const checkConfirmPassHandler = (pass) => {
    setValues(pass);
  };


  return (
    <div className="regForm" id="reg-step3-company-details">

      <PassInput email={props.password} onChange={props.onChange}></PassInput>
      <PassInput email={confirmPass} label="Confirm Password" onChange={checkConfirmPassHandler}></PassInput>

    </div>
  )
}