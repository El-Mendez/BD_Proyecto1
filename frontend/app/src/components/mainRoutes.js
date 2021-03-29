import React from "react";
import Dashboard from './dashboard/dashboard'
import LogIn from "./logIn/logIn";
import SignUp from "./register/register"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


export default class MainRoutes extends React.Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={LogIn}/>
          <Route path="/signUp" component={SignUp}/>
          <Route path="/dashboard" exact component={Dashboard}/>
        </Switch>
      </Router>
    );
  }
}
