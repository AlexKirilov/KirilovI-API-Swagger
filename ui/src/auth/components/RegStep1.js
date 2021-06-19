import React, { useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { checkForExistingWebSiteName, getSiteTypes } from "../services/authService.js";


export const RegistrationStep1 = ({ company, companyType, handleCompanyChange, handleCompanyTypeChange, handlerCompanyValidation }) => {
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      getList()

    // cancel subscription to useEffect
    return () => (
      isSubscribed = false
    )
  }, []);

  const [isExist, setIsExist] = React.useState(false);
  const [siteList, setSiteList] = React.useState([]);

  const getList = () => {
    getSiteTypes().then((list) => {
      if (list && list.length > 0) {
        setSiteList(list);
      }
    })
  }

  const handlerCheckName = async (e) => {
    const res = await checkForExistingWebSiteName(e.target.value)
    const exist = e.target.value && e.target.value.length ?
      (typeof res === "boolean") ? res : res.data : false;
    setIsExist(exist);
    handlerCompanyValidation(exist);
  }

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
          error={isExist !== false}
          helperText={isExist ? 'Company name already exists' : null}
          onChange={handleCompanyChange}
          required={true}
          onBlur={handlerCheckName}
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
          {
            siteList.map((type) => (
              <MenuItem value={type.id} key={'key-' + type.id}>{type.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  )
}