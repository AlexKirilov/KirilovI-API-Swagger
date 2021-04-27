import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { EmailInput } from "./EmailInput";
import { PassInput } from "./PassInput";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const RegistrationStep4 = (props) => {
  const classes = useStyles();

  return (
    <div className="regForm" id="reg-step4-company-details">

      <FormControl className="regFields username-input">
        <InputLabel htmlFor="reg-new-username">Username</InputLabel>
        <Input
          id="reg-new-username-name"
          type="text"
          value={props.username}
          onChange={props.handleUsernameChange}
        />
      </FormControl>

      <label> ----- OR -----</label>

      <FormControl className="regFields first-input">
        <InputLabel htmlFor="reg-new-first-name">First Name</InputLabel>
        <Input
          id="reg-new-first-name"
          type="text"
          value={props.firstName}
          onChange={props.handleFirstNameChange}
        />
      </FormControl>

      <FormControl className="regFields last-name-input">
        <InputLabel htmlFor="reg-new-last-name">Last Name</InputLabel>
        <Input
          id="reg-new-last-name"
          type="text"
          value={props.lastName}
          onChange={props.handleLastNameChange}
        />
      </FormControl>

    </div>
  )
}