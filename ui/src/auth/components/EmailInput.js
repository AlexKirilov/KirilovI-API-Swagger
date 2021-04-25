import React from 'react'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const EmailInput = (props) => {

  return (
    <FormControl className="email-input">
      <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
      <Input
        id="standard-adornment-email"
        type="email"
        value={props.email}
        onChange={props.onChange}
      />
    </FormControl>
  )
}