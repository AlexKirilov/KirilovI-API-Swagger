import React from 'react';
import { PassInput } from "./PassInput";
import { FormLabel } from '@material-ui/core';
import '../auth.scss';

export const RegistrationStep3 = ({ value, onChange, onPassValidChange }) => {
  const [confirmPass, setValues] = React.useState("");
  const [isPassMatched, setPassMatch] = React.useState(null);
  const [strongPass, setStrongPass] = React.useState({
    capital: false,
    length: false,
    specChar: false,
    small: false,
    digits: false,
    isPassValid: false
  });

  const checkConfirmPassHandler = (pass) => {
    setValues(pass.target.value);
    if (value === pass.target.value) {
      setPassMatch(true);
      onPassValidChange(strongPass.isPassValid);
    } else if (value.length === pass.target.value.length) {
      onPassValidChange(false);
      setPassMatch(false);
    } else {
      setPassMatch(null);
      onPassValidChange(false);
    }
  };

  const passDigits = /[0-9]/;
  const passSmallLetters = /[a-z]/;
  const passUpperLetters = /[A-Z]/;
  const passSpecCharacters = /[-+_!@#$%^&*.,?]/;

  const handlerPassChange = (e) => {
    onChange(e);
    checkIsPassStrong(e.target.value)
  }

  const checkIsPassStrong = (val) => {
    setStrongPass({
      ...strongPass,
      length: val.length >= 8,
      digits: passDigits.test(val),
      small: passSmallLetters.test(val),
      capital: passUpperLetters.test(val),
      specChar: passSpecCharacters.test(val),
      isPassValid: val.length >= 8 && passDigits.test(val) && passSmallLetters.test(val) && passUpperLetters.test(val) && passSpecCharacters.test(val)
    });
  }

  return (
    <div className="regForm" id="reg-step3-company-details">

      <PassInput name="password" value={value} onChange={handlerPassChange} required={true}></PassInput>
      <PassInput name="confPassword" value={confirmPass} onChange={checkConfirmPassHandler}
        required={true} labelName="Confirm Password" isError={isPassMatched === false} errorMsg="Password doesn't match"></PassInput>

      <section className="sec-strong-pass-res">
        <FormLabel className={strongPass.specChar ? 'exist' : 'missing'} >Must contain special characters</FormLabel>
        <FormLabel className={strongPass.length   ? 'exist' : 'missing'} >Length must exceed 8 characters</FormLabel>
        <FormLabel className={strongPass.capital  ? 'exist' : 'missing'} >Must contain capital letters</FormLabel>
        <FormLabel className={strongPass.small    ? 'exist' : 'missing'} >Must contain small letters</FormLabel>
        <FormLabel className={strongPass.digits   ? 'exist' : 'missing'} >Must contain digits</FormLabel>
      </section>
    </div>
  )
}