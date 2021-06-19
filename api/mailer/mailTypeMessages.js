
// TODO: Contains the default email content
//Content as heather, logo and footer
const baseHTMLForm = (main) => {
  `
  <heather>

  </heather>

  <main>
    ${main}
  </main>
  
  <footer>

  </footer>
  `
};

export const confirmNewAccount = (URI) => {
  const form = `
  <p>Please click me: ${URI}</p>
  `;
  return {
    subject: 'Kirilovi API account confirmation',
    text: baseHTMLForm(form)
  }
}

export const expiredVerificationLink = (
  { expTime, verifyURL, deleteURL }
) => {
  const form = `
    <h1>Verification link expired at ${expTime}.</h1>
    <p>Press on the "Resend" button to resend the verification link.</p>
    <p>Press on the "Delete" button to delete your account from our databases.</p>
    
    <form action="${verifyURL}">
        <input type="submit" value="Resend" />
    </form>
    <form action="${deleteURL}">
        <input type="submit" value="Delete my account" />
    </form>
  `;

  return {
    subject: 'New verification link',
    text: baseHTMLForm(form)
  }
};

export const expiringAccount = (
  { expiresAfter, newExpTime, appURL }
) => {
  // Income data must provide the full details as '3 days', '6 months' and etc.
  const form = `
    <p>
      Your account is about to expire after ${expiresAfter}.
    </p>

    <p>
      To prevent your account to be delete from our system, just SignIn again.
      Expiration time will be increased with another ${newExpTime}.
    </p>

    <p>
      Use the link below to navigate to the application page!
    </p>

    <a src="${appURL}"></a>
  `;
  // TODO: Add the dynamic application URL path

  // <form action="${appURL}">
  //     <input type="submit" value="Login" />
  // </form>
  return {
    subject: 'Account is about to expire',
    text: form
  }
}

export const unInformedUsersForExpiringAccounts = (list) => {
  // TODO: Form requires a lot of improvement
  const form = `
    <p>There was a problem with informing the following users for expiring accounts!</p>
    <ol>
      ${list.foreach( acc => {
        '<li> Email: ' + acc.email + ' - Last Login: ' + acc.lastLogin + '</li>'
      })}
    </ol>
  `;

  return {
    subject: 'Uninformed user list',
    text: form
  }
}

export const emptyForm = (props) => {
  const form = `

  `;

  return {
    subject: '',
    text: form
  }
}