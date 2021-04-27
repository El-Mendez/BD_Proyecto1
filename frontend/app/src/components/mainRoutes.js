import React from "react";
import Dashboard from './dashboard/dashboard'
import LogIn from "./logIn/logIn";
import SignUp from "./register/register"
import User from "./user/user";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


export default function MainRoutes() {
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn}/>
          <Route path="/signUp" component={SignUp}/>
          <Route path="/home/:user" component={Dashboard}/>
          <Route path="/user/:user" component={User}/>
        </Switch>
      </Router>
    );
}
