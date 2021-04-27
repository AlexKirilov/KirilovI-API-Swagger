import React from 'react';
import { EmailInput } from "./EmailInput";

export const RegistrationStep2 = (props) => {
  const [confirmEmail, setValues] = React.useState();

  const checkConfirmEmailHandler = (email) => {
    setValues(email);
  };

  return (
    <div className="regForm" id="reg-step2-company-details">

      <EmailInput email={props.email} onChange={props.onChange}></EmailInput>
      <EmailInput email={confirmEmail} label="Confirm Email" onChange={checkConfirmEmailHandler}></EmailInput>

    </div>
  )
}