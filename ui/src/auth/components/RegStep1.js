import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


export const RegistrationStep1 = ({company, companyType, handleCompanyChange, handleCompanyTypeChange}) => {

  return (
    <div className="regForm" id="reg-step1-company-details">

      <FormControl required className="regFields company-input">
        <TextField
          autoComplete="off"
          id="reg-new-company-name"
          name="companyName"
          label="Company Name"
          type="text"
          value={company}
          onChange={handleCompanyChange}
          required={true}
        />
      </FormControl>

      <FormControl required className="regFields company-types">
        <InputLabel shrink id="reg-new-company-type-select">
          Select Company Type
        </InputLabel>
        <Select
          labelId="reg-new-company-type-select"
          id="reg-new-company-type-select"
          name="webSiteType"
          value={companyType}
          onChange={handleCompanyTypeChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="none"><em>None</em></MenuItem>
          <MenuItem value="shop">Shop</MenuItem>
          <MenuItem value="property">Property</MenuItem>
        </Select>
      </FormControl>

    </div>
  )
}