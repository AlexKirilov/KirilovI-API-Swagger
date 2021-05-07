import React from 'react';
import "./loader.scss";

export const FinalStepAccCreation = (props) => {
  return (
    <div className="regForm" id="reg-info-step">

      <h3>We are preparing you environment and it will take a few seconds</h3>
      <h4>Please wait and do not refresh the page!</h4>

      <div style={{ height: 100, width: '100%' }}>
        <div className="box">
          <div className="loader-37"></div>
        </div>
      </div>

      Spinner (it will be visible for a few seconds 5-10)
      it requires nice animation


      Account was created
      To activate the account, please open your email and follow the activation link
      Activation link will expire after 24 hours.
      If the account is not activate until the time expires the account will be delete after those 24 hours


    </div>
  )
}