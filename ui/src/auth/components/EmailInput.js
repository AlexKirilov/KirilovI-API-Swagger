import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

export const EmailInput = (props) => {

  return (
    <FormControl className="email-input-fields">
      <TextField
        autoComplete="off"
        id={"email-input-label-" + props.label}
        type="email"
        name={props.name} 
        label={props.label ? props.label : "Email"}
        value={props.email}
        onChange={props.onChange}
        error={props.invalid !== null}
        helperText={props.invalid}
        required={props.required}
        onBlur={props.onBlur}
      />
    </FormControl>
  )
}