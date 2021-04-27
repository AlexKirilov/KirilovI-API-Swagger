import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const RegistrationStep1 = (props) => {
  const classes = useStyles();

  return (
    <div className="regForm" id="reg-step1-company-details">

      <FormControl required className="regFields company-input">
        <InputLabel htmlFor="reg-new-company-name">Company Name</InputLabel>
        <Input
          id="reg-new-company-name"
          type="text"
          value={props.company}
          onChange={props.handleCompanyChange}
        />
      </FormControl>

      <FormControl required className="regFields company-types">
        <InputLabel shrink id="reg-new-company-type-select">
          Select Company Type
        </InputLabel>
        <Select
          labelId="reg-new-company-type-select"
          id="reg-new-company-type-select"
          value={props.companyType}
          onChange={props.handleCompanyTypeChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="shop">Shop</MenuItem>
          <MenuItem value="property">Property</MenuItem>
        </Select>
      </FormControl>

    </div>
  )
}