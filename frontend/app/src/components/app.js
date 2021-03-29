import React from "react";
import Dashboard from './dashboard/dashboard'
import LogIn from "./logIn/logIn";
import SignUp from "./register/register"
import Report from './report/report'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


export default class App extends React.Component {
    render() {
        return(
            <Router>
                <Switch>
                    <Route path={'/'} exact component={LogIn}/>
                    <Route path={'/sign_up'} component={SignUp}/>
                    <Route path={'/dashboard'} exact component={Dashboard}/>
                </Switch>
            </Router>
        );
    }
}
