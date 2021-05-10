import React from 'react';

export const RegistrationStepInfo = (props) => {
  return (
    <div className="regForm" id="reg-info-step">

      <section className="StepZero-paper">
        <h3>Important information</h3>
        <p>
          When account is created, it has to be activated by navigate to the provided link sended to your email.
          Activation link will be available 24 hours.
          If the account is not activate in that time, all personal details will be automatically delete.
          System will detect inactivity for 6 months and it will delete all details permanently.
        </p>
      </section>
      {/* <TextField
        id="reg-data-form-info"
        label="Multiline"
        multiline
        rows={20}
        defaultValue="Default Value"
        variant="outlined"
      /> */}

    </div>
  )
}