import React from "react";
import Dashboard from './dashboard/dashboard'
import LogIn from "./logIn/logIn";
import SignUp from "./register/register"
import User from "./user/user";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


export default class MainRoutes extends React.Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn}/>
          <Route path="/signUp" component={SignUp}/>
          <Route path="/home" component={Dashboard}/>
          <Route path="/user/:id" component={User}/>
        </Switch>
      </Router>
    );
  }
}
