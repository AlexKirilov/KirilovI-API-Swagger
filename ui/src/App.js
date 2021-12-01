import React from 'react';
import './App.scss';
import { checkSession } from "./Core/services/CookieService"

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import { Verify } from './auth/Verify';
import { PassRestore } from './auth/PassRestore';

// Main Components
import { Header } from "./components/Header";
import { HeaderHome } from "./components/HeaderHome";

// Main Pages
import { HomePage } from "./pages/home/Home";
import Dashboard from "./pages/Dashboard/Dashboard.lazy";
import Employees from "./pages/Employees/Employees.lazy";
import Clients from "./pages/Clients/Clients.lazy";
import Orders from "./pages/Orders/Orders.lazy";
import SiteDetails from "./pages/SiteDetails/SiteDetails.lazy";
import SiteLogs from "./pages/SiteLogs/SiteLogs.lazy";

function App() {

  const renderContent = () => {
    if (checkSession()) { // If session is still active display content pages
      return (
        <div>
          <Header></Header>
          <section>
            <Switch>
              <Redirect from="/" exact to="/dashboard/" />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/employees" component={Employees} />
              <Route path="/customers" component={Clients} />
              <Route path="/purchases" component={Orders} />
              <Route path="/details" component={SiteDetails} />
              <Route path="/logs" component={SiteLogs} />

              {/* <Route path="/restore-pass" component={PassRestore} /> */}
            </Switch>
          </section>
        </div>
      )
    } else { // If there is no session display Auth pages
      return (
        <section>
          {/* <HeaderHome></HeaderHome>
          <section  style="margin-top: 64px;"></section> */}
          <Switch>
            {/* <Redirect from="/" exact to="/home/" /> */}
            <Redirect from="/" exact to="/sign-in/" />
            {/* <Route path="/home" exact component={HomePage} /> */}
            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/restore-pass" component={PassRestore} />
            <Route path="/verifyMe/:token" component={Verify} />
          </Switch>
          {/* <HomePage></HomePage> */}
        </section>
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