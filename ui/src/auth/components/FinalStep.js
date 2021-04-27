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

export const FinalStepAccCreation = (props) => {
  const classes = useStyles();

  return (
    <div className="regForm" id="reg-info-step">

      It will take a few seconds. Please wait, do not refresh the page, we are preparing your account
      
      Spinner (it will be visible for a few seconds 5-10)
      it requires nice animation


      Account was created
      To activate the account, please open your email and follow the activation link
      Activation link will expire after 24 hours. 
      If the account is not activate until the time expires the account will be delete after those 24 hours
      

    </div>
  )
}