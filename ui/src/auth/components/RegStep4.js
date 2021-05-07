import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const RegistrationStep4 = ({username, firstName, lastName, onChange}) => {
  return (
    <div className="regForm" id="reg-step4-company-details">

      <FormControl className="regFields username-input">
        <InputLabel htmlFor="reg-new-username">Username</InputLabel>
        <Input
          id="reg-new-username-name"
          type="text"
          name="username"
          value={username}
          onChange={onChange}
        />
      </FormControl>

      <label> ----- OR -----</label>

      <FormControl className="regFields first-input">
        <InputLabel htmlFor="reg-new-first-name">First Name</InputLabel>
        <Input
          id="reg-new-first-name"
          type="text"
          name="firstName"
          value={firstName}
          onChange={onChange}
        />
      </FormControl>

      <FormControl className="regFields last-name-input">
        <InputLabel htmlFor="reg-new-last-name">Last Name</InputLabel>
        <Input
          id="reg-new-last-name"
          type="text"
          name="lastName"
          value={lastName}
          onChange={onChange}
        />
      </FormControl>

    </div>
  )
}