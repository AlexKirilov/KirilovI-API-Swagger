import React from 'react';
import { EmailInput } from "./EmailInput";

const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const RegistrationStep2 = (props) => {
  const [confirmEmail, setConfirmEmailValues] = React.useState("");
  const [invalid, setInvalid] = React.useState({
    format: null,
    notMatched: null
  });

  // TODO: This bit can be done a lot better
  // Require more research
  const checkConfirmEmailHandler = (e) => {
    const email = e.target.value;
    setConfirmEmailValues(email);

    if (email.length === props.email.length) {
      if (email === props.email) {
        setInvalid({ ...invalid, notMatched: null });
        props.onEmailValidChange(true);
      } else {
        setInvalid({ ...invalid, notMatched: `Emails doesn't match` });
        props.onEmailValidChange(false);
      }
    } else if (email.length > props.email.length / 2) {
      props.onEmailValidChange(false);
      setInvalid({ ...invalid, notMatched: `Emails doesn't match` });
    } else setInvalid({ ...invalid, notMatched: null });
  };

  const checkEmailHandler = (e) => {
    const email = e.target.value;
    if (email.length > 8) {
      if (!regex.test(email)) setInvalid({ ...invalid, format: 'Invalid email format' })
      else setInvalid({ ...invalid, format: null });
    } else setInvalid({ ...invalid, format: null });
    props.emailHandler(e);
  };

  // TODO: Prevent paste on 'Confirmation field'
  return (
    <div className="regForm" id="reg-step2-company-details">

      <EmailInput name="email" email={props.email} onChange={checkEmailHandler} invalid={invalid.format} required={true}></EmailInput>
      <EmailInput name="confirmEmail" email={confirmEmail} onChange={checkConfirmEmailHandler} label="Confirm Email" invalid={invalid.notMatched} required={true}></EmailInput>

    </div>
  )
}