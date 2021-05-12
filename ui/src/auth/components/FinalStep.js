import React from 'react';
import "./loader.scss";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const stepsList = [
  'Creating the account',
  'Configuring the DataBase',
  'Preparing the account dashboard',
  'Final preparations',
  'Activation email was send to the owner',
  'All done'
];


export const FinalStepAccCreation = ({ finalMSG }) => {
  const [steps, setSteps] = React.useState([]);

  function loadSteps(i) {
    setTimeout(() => {
      setSteps((prev) => [...prev, stepsList[i]]);
      if (i < stepsList.length - 1) {
        loadSteps(i + 1);
      }
    }, 2000)
  }


  if (finalMSG && finalMSG.data && finalMSG.data.message) {
    setSteps([]);
  } else {
    if (!steps.length)
      loadSteps(0);
  }

  return (
    <div className="regForm" id="final-step">

      <section className="card-content-acc-creation">
        <div style={{ minHeight: '180px' }}>
          {
            (steps && steps.length < stepsList.length && (finalMSG && finalMSG.data && !finalMSG.message)) ? (
              <div>
                <h3>We are preparing your environment and it will take a few seconds.</h3>
                <h4>Please wait and do not refresh the page!</h4>
                <div className="box">
                  <div className="loader-37"></div>
                </div>
              </div>
            ) : (
              (finalMSG && finalMSG.data && !finalMSG.message) ? (
                <div>
                  <h3>Account was created successfully</h3>
                  <p style={{
                    textAlign: 'justify',
                    width: '70%',
                    margin: '20px auto'
                  }}>
                    To activate the account, please open your email and follow the activation link,
                    if it's not used in 24 hours, account will be delete.
            </p>

                  <ThumbUpIcon color="primary" style={{ fontSize: '70px' }}></ThumbUpIcon>
                </div>
              ) : (
                <div className="fail-acc-creation-msg">
                  <p>We are sorry, but there was an issue with provided details. Please use the button below to reset the form and try again.</p>
                  <p>Error is: {finalMSG && finalMSG.data ? finalMSG.data.message : 'unknown'}</p>
                </div>
              )
            )}

        </div>

        <section className="code-screen">
          <ol className="ordered-steps-acc-create">

            {steps.map((step, index) => (
              <li key={"step -" + index}> {step} </li>
            ))}
          </ol>
        </section>
      </section>

    </div>
  )
}