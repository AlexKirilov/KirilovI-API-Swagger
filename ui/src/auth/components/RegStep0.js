import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const RegistrationStepInfo = (props) => {
  const classes = useStyles();

  return (
    <div className="regForm" id="reg-info-step">

      <TextField
        id="reg-data-form-info"
        label="Multiline"
        multiline
        rows={20}
        defaultValue="Default Value"
        variant="outlined"
      />

    </div>
  )
}