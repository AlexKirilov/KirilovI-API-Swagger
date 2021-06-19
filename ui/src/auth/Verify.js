import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { verifyToken } from "./services/authService";
import Button from '@material-ui/core/Button';

export const ExpiredToken = ({ expDate }) => {

  const handleReSend = () => {

  }

  const handleDeleteAcc = () => {

  }


  return (
    <section>
      <h1>Link expired at {expDate}.</h1>

      <section>
        <Button
          onClick={handleReSend}
          variant="contained"
          color="primary">
          Re-send Activation Link
        </Button>

        <Button
          onClick={handleDeleteAcc}
          variant="contained"
          color="secondary">
          Delete Account
        </Button>
      </section>
    </section>
  )
}

export const ActivatedAcc = () => {
  const history = useHistory();

  const toLoginPage = () => {
    history.push('/sign-in/');
  }

  return (
    <section>
      <h2>Account was activated!</h2>

      <Button
        onClick={toLoginPage}
        variant="contained"
        color="secondary">
        Login Page
        </Button>
    </section>
  )
}

export const Verify = ({ match }) => {
  const [view, setView] = useState(null);
  const [res, setResponse] = useState({
    expDate: null,
    deleteLink: null,
    newVerifyLink: null
  });

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed && match && match.params && match.params.token) {
      verifyToken(match.params.token).then(
        res => {
          if (res && res.status === 404 && res.data) {
            setResponse({ ...res.data })
            setView('failed')
          } else {
            setView('success')
          }
          console.log('Ver= > ', res);
        })
    }

    // cancel subscription to useEffect
    return () => (isSubscribed = false)
  }, [match, res, view])


  return (
    <section>
      {
        (view === 'failed') ? <ExpiredToken expDate={res.expDate}></ExpiredToken> :
          (view === 'success') ? <ActivatedAcc></ActivatedAcc> : (
            <section>
              <h2>Processing ...</h2>
            </section>
          )
      }
    </section>
  )
}