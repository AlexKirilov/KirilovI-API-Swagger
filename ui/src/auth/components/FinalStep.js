import React, { useEffect } from 'react';
import "./loader.scss";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const stepsList = [
  'Creating the account',
  'Configuring the DataBase',
  'Preparing the account dashboard',
  'Final preparations'
];


export const FinalStepAccCreation = ({ finalMSG }) => {
  const [steps, setSteps] = React.useState([]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      up()

    return ( () => isSubscribed = false)
  }, [finalMSG]);

  const up = () => {
    if (finalMSG && finalMSG.data && finalMSG.data.message) {
      setSteps([]);
    } else {
      if (finalMSG === 'start') {
        setSteps(stepsList);
      }
      if (finalMSG === 'done') {
        const red = [...stepsList];
        red.push('Activation email was send to the owner');
        red.push('All done');
        setSteps(red);
      }
    }
  }

  return (
    <div className="regForm" id="final-step">

      <section className="card-content-acc-creation">
        <div style={{ minHeight: '180px' }}>
          {
            (steps && finalMSG === 'start') ? (
              <div>
                <h3>We are preparing your environment and it will take a few seconds.</h3>
                <h4>Please wait and do not refresh the page!</h4>
                <div className="box">
                  <div className="loader-37"></div>
                </div>
              </div>
            ) : (
              (finalMSG === 'done') ? (
                <div>
                  <h3>Account was created successfully</h3>
                  <p style={{
                    textAlign: 'justify',
                    width: '70%',
                    margin: '20px auto'
                  }}>
                    To activate the account, open your email and follow the activation link.
                    Link will expire in 24 hours.
            </p>

                  <ThumbUpIcon color="primary" style={{ fontSize: '70px' }}></ThumbUpIcon>
                </div>
              ) : (
                <div className="fail-acc-creation-msg">
                  <p>Preparation process was interrupted by an error.</p>
                  <p>{finalMSG && finalMSG.data ? finalMSG.data.message : 'unknown'}</p>
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