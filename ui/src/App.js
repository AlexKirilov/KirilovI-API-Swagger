import "./App.scss";
import React from "react";

import { checkSession } from "./Core/services/CookieService";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { SignIn } from "./auth/SignIn";
import { SignUp } from "./auth/SignUp";
import { Verify } from "./auth/Verify";
import { PassRestore } from "./auth/PassRestore";

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
import ClientSwagger from "./pages/ClientSwagger/ClientSwagger.lazy";
import Products from "./pages/Products/Products.lazy";

function App() {
  const authPages = [
    "",
    "/",
    "/sign-in",
    "/sign-up",
    "/restore-pass",
    "/verifyMe/:token",
  ];

  const renderContent = () => {
    if (checkSession()) {
      // If session is still active display content pages
      return (
        <div>
          <Header></Header>
          <section>
            <Switch>
              <Redirect from="/" exact to="/dashboard/" />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/employees" component={Employees} />
              <Route path="/customers" component={Clients} />
              <Route path="/products" component={Products} />
              <Route path="/purchases" component={Orders} />
              <Route path="/details" component={SiteDetails} />
              <Route path="/logs" component={SiteLogs} />
              <Route path="/docs" component={ClientSwagger} />

              {/* <Route path="/restore-pass" component={PassRestore} /> */}
            </Switch>
          </section>
        </div>
      );
    } else {
      // if (!authPages.includes(window.location.pathname)) {
      //   return (
      // //     <Switch>
      //       <Redirect push to="/" />
      // //       <Redirect from="/" exact to="/sign-in" />
      // //       <Route path="/sign-in" exact component={SignIn} />
      // //     </Switch>
      //   );
      // } else
        return (
          <section>
            {/* <HeaderHome></HeaderHome>
          <section  style="margin-top: 64px;"></section> */}
            <Switch>
              {/* <Redirect from="/" exact to="/home/" /> */}
              <Redirect from="/" exact to="/sign-in" />
              {/* <Route path="/home" exact component={HomePage} /> */}
              <Route path="/sign-in" exact component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/restore-pass" component={PassRestore} />
              <Route path="/verifyMe/:token" component={Verify} />
            </Switch>
            {/* <HomePage></HomePage> */}
          </section>
        );
    }
  };

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
