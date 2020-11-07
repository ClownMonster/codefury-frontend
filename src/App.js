import React ,{Fragment}from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// component imports

import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/layout/Landing"
import Workers from "./components/workers/Workerslist"




function App() {
  return (
    <Router>
    <Fragment>
      <Route exact path='/' component={Landing} />
      <section >
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/workers" component={Workers} />

          
        </Switch>
      </section>
    </Fragment>
  </Router>
  );
}

export default App;
