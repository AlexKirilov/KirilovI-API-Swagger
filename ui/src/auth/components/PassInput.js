import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

export const PassInput = ({value, name, isError, required, labelName, onChange, disabled, errorMsg}) => {
  const [showPassword, setValues] = React.useState(false);

  const handleClickShowPassword = () => {
    setValues(!showPassword);
  };

  return (
    <FormControl className="passwords-input-fields" error={isError === true}>
      <InputLabel htmlFor="password-input-field" required={required}>{labelName ? labelName : "Password"}</InputLabel>
      <Input
        autoComplete="off"
        id={name + "-input-field"}
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-describedby="component-error-text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText id="component-error-text">{isError ? errorMsg : ''}</FormHelperText>
    </FormControl>
  )
}