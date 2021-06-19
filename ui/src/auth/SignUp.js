import "./auth.scss";
import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Step from '@material-ui/core/Step';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { signUp } from './services/authService';
import { useHistory } from "react-router-dom";

import { RegistrationStepInfo } from "./components/RegStep0";
import { RegistrationStep1 } from "./components/RegStep1";
import { RegistrationStep2 } from "./components/RegStep2";
import { RegistrationStep3 } from "./components/RegStep3";
import { RegistrationStep4 } from "./components/RegStep4";
import { RegistrationStep5 } from "./components/RegStep5";
import { FinalStepAccCreation } from "./components/FinalStep";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
}));

function getSteps() {
  return [
    'Intro',
    'Company details',
    'Access details - Email',
    'Access details - Password',
    'Owner details',
    'Agreement'
  ];
}

export const SignUp = () => {
  const history = useHistory();

  const steps = getSteps();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(6);
  const [accCreationRes, setCreationRes] = React.useState(null);
  const [formDetails, setFormDetails] = React.useState({
    email: "",
    password: "",
    username: "",
    lastName: "",
    firstName: "",
    companyName: "",
    webSiteType: "none",
    isEmailValid: false,
    isCompanyExist: false,
    isPasswordValid: false,
    agreementChecked: false
  });

  const handleFormUpdate = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  }

  const handleFormUpdateCheckB = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.checked });
  }

  const handlerPassValidationChange = (e) => {
    setFormDetails({ ...formDetails, isPasswordValid: e });
  }

  const handlerEmailValidation = (e) => {
    setFormDetails({ ...formDetails, isEmailValid: e });
  }

  const handlerCompanyValidation = (e) => {
    setFormDetails({ ...formDetails, isCompanyExist: e });
  }

  const validFormValues = () => {
    return formDetails.email !== "" && formDetails.password !== "" &&
      formDetails.password.length >= 8 && formDetails.webSiteType !== "none" &&
      formDetails.isEmailValid && formDetails.isPasswordValid && formDetails.agreementChecked
      && formDetails.companyName !== "";
  }

  const createAccount = () => {
    if (validFormValues()) {
      const { isEmailValid, isPasswordValid, agreementChecked, companyName, webSiteType, ...data } = formDetails;
      data.siteName = companyName;
      data.type = webSiteType;
      
      setCreationRes('start');

      signUp(data).then(
        res => {
          setCreationRes('done');
        },
        err => {
          setCreationRes(err.data ? err.data : err);
          console.log('Issue has occur creating the new account => ', err)
        });
    } else {
      console.log('Issue an occur on entering the new account details. Form validation failed!')
    }
  }

  const checkIfNextEnabled = (step = activeStep) => {
    if (step === 1)
      return !(formDetails.company !== '' && formDetails.webSiteType !== "none" && !formDetails.isCompanyExist)
    else if (step === 2)
      return !(formDetails.email !== '' && formDetails.isEmailValid)
    else if (step === 3)
      return !(formDetails.password !== '' && formDetails.isPasswordValid)
    else if (step === 4)
      return !(formDetails.username !== '' || formDetails.firstName !== "" && formDetails.lastName !== "")
    else if (step === 5)
      return !(formDetails.agreementChecked)
    return false;
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <RegistrationStepInfo></RegistrationStepInfo>;
      case 1:
        return <RegistrationStep1
          company={formDetails.company}
          companyType={formDetails.webSiteType}
          handleCompanyChange={handleFormUpdate}
          handleCompanyTypeChange={handleFormUpdate}
          handlerCompanyValidation={handlerCompanyValidation}
        >
        </RegistrationStep1>;
      case 2:
        return <RegistrationStep2
          email={formDetails.email}
          isEmailValid={formDetails.isEmailValid}
          emailHandler={handleFormUpdate}
          onEmailValidChange={handlerEmailValidation}
        >
        </RegistrationStep2>;
      case 3:
        return <RegistrationStep3
          value={formDetails.password}
          onChange={handleFormUpdate}
          onPassValidChange={handlerPassValidationChange}
        >
        </RegistrationStep3>;
      case 4:
        return <RegistrationStep4
          username={formDetails.username}
          firstName={formDetails.firstName}
          lastName={formDetails.lastname}
          onChange={handleFormUpdate}
        >
        </RegistrationStep4>;
      case 5:
        return <RegistrationStep5
          checked={formDetails.agreementChecked}
          onChange={handleFormUpdateCheckB}
        >
        </RegistrationStep5>;
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      createAccount();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlerToLogin = () => {
    history.push('/sign-in/');
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>

        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions} component={'div'} variant={'body2'}>
              <FinalStepAccCreation finalMSG={accCreationRes}></FinalStepAccCreation>
            </Typography>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={activeStep !== 0 ? '' : 'hide ' + classes.button}>
              Back
              </Button>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className="wizard-control-btns">
              <Button
                variant="contained"
                className={activeStep !== 0 ? 'hide ' : '' + classes.button}
                color="primary"
                onClick={handlerToLogin}
              > To Login Page</Button>

              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={activeStep !== 0 ? '' : 'hide ' + classes.button}>
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={checkIfNextEnabled(activeStep)}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
            <Typography className={classes.instructions} component={'div'} variant={'body2'}>{getStepContent(activeStep)}</Typography>
          </div>
        )}
      </div>
    </div>
  );
}