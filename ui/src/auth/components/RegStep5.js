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

export const RegistrationStep5 = (props) => {
  const classes = useStyles();

  return (
    <div className="regForm" id="reg-step5-company-details">

      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={20}
        defaultValue="Default Value"
        variant="outlined"
      />

    </div>
  )
}