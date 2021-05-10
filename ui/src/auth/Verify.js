import React from 'react';
import { useHistory } from "react-router-dom";

export const Verify = () => {
  const history = useHistory();

  function checkForActivationToken() {
    console.log(history);
  }

  checkForActivationToken();
  
  return (
    <p>Verify page</p>
  )
}