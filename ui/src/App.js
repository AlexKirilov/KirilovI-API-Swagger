import React from 'react';
import './App.css';
import { checkSession } from "./services/CookieService"

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import { PassRestore } from './auth/PassRestore';

// Main Components
import { Header } from "./components/Header";

// Main Pages
import { DashboardPage } from "./pages/dashboard/Dashboard";
import { EmployeesPage } from "./pages/employees/Employees";

function App() {

  const renderContent = () => {
    if (checkSession()) { // If session is still active display content pages
      return (
        <div>
          <Header></Header>
          <section>
            <Switch>
              <Redirect from="/" exact to="/dashboard/" />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/employees" component={EmployeesPage} />
              {/* <Route path="/restore-pass" component={PassRestore} /> */}
            </Switch>
          </section>
        </div>
      )
    } else { // If there is no session display Auth pages
      return (
        <Switch>
          <Redirect from="/" exact to="/sign-in/" />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/restore-pass" component={PassRestore} />
        </Switch>
      )
    }
  }


  return (
    <Router>
      <div className="App">
        {renderContent()}
        {/* <Header></Header> */}
        {/* <SignIn></SignIn> */}
      </div>
    </Router>
  );
}

export default App;