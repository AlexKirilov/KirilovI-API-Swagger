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


export const FinalStepAccCreation = (props) => {
  const [steps, setSteps] = React.useState([]);

  function loadSteps(i) {
    setTimeout(() => {
      setSteps((prev) => [...prev, stepsList[i]]);
      if (i < stepsList.length - 1) {
        loadSteps(i + 1);
      }
    }, 2000)
  }

  if (!steps.length)
    loadSteps(0);

  return (
    <div className="regForm" id="final-step">

      <section className="card-content-acc-creation">
        <div style={{ minHeight: '180px' }}>
          {steps.length < stepsList.length ? (
            <div>
              <h3>We are preparing your environment and it will take a few seconds.</h3>
              <h4>Please wait and do not refresh the page!</h4>
              <div className="box">
                <div className="loader-37"></div>
              </div>
            </div>
          ) : (

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